import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { siteProfile } from '@/data/profile';

const contactSchema = z.object({
  from_name: z.string().min(2).max(200),
  reply_to: z.string().email().max(320),
  message: z.string().min(10).max(8000),
});

const DEFAULT_FROM = 'koladedev@xophie.ai';

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      default:
        return ch;
    }
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email is not configured on the server (missing RESEND_API_KEY).' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? 'Invalid form data.' },
      { status: 400 }
    );
  }

  const { from_name, reply_to, message } = parsed.data;
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const fromHeader = `${siteProfile.name} <${fromEmail}>`;
  const inboxTo = process.env.CONTACT_TO_EMAIL?.trim() || siteProfile.email;

  const safeName = escapeHtml(from_name);
  const safeEmail = escapeHtml(reply_to);
  const safeMessage = escapeHtml(message).replace(/\r\n|\n|\r/g, '<br/>');

  const notificationHtml = `
    <h1>New portfolio inquiry</h1>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${safeMessage}</p>
  `;

  const calendlyUrl = escapeHtml(siteProfile.calendlyUrl);
  const autoHtml = `
    <p>Hi ${safeName},</p>
    <p>Thanks for reaching out — I received your message and will reply as soon as I can.</p>
    <p>If you would like to book time directly, you can use my Calendly link:<br/>
    <a href="${calendlyUrl}">${calendlyUrl}</a></p>
    <p>Best,<br/>${escapeHtml(siteProfile.name)}</p>
  `;

  const resend = new Resend(apiKey);

  try {
    const notify = await resend.emails.send({
      from: fromHeader,
      to: inboxTo,
      replyTo: reply_to,
      subject: `Portfolio inquiry from ${from_name}`,
      html: notificationHtml,
    });

    if (notify.error) {
      console.error('Resend notify error:', notify.error);
      return NextResponse.json(
        { error: 'Could not send your message. Please try again later.' },
        { status: 502 }
      );
    }

    const auto = await resend.emails.send({
      from: fromHeader,
      to: reply_to,
      subject: 'Thanks — I got your message',
      html: autoHtml,
    });

    if (auto.error) {
      console.error('Resend auto-reply error:', auto.error);
      return NextResponse.json({ ok: true, autoReplyFailed: true });
    }

    return NextResponse.json({ ok: true, autoReplyFailed: false });
  } catch (e) {
    console.error('Contact API error:', e);
    return NextResponse.json(
      { error: 'Could not send your message. Please try again later.' },
      { status: 502 }
    );
  }
}
