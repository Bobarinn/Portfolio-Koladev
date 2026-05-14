# Contact form email (Resend)

Submissions go through a **server-only** route (`POST /api/contact`) so your **Resend API key never ships to the browser**.

## What gets sent

1. **You** — A notification at your inbox address with the visitor’s name, email, and message. `Reply-To` is set to their address so you can answer in one click.
2. **The visitor** — A short confirmation that you received their message, plus your Calendly link (from `siteProfile` in `src/data/profile.ts`).

Both emails are sent **from** `koladedev@xophie.ai` by default (override with `RESEND_FROM_EMAIL` if needed). The domain must be **verified in Resend** before production sends work.

## Environment variables

Add these to **`.env.local`** (local) and to your host (e.g. Vercel → Project → Settings → Environment Variables). **Do not** prefix the API key with `NEXT_PUBLIC_`.

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key (server only). |
| `CONTACT_TO_EMAIL` | No | Where inquiries are delivered. Defaults to `siteProfile.email` in `src/data/profile.ts`. |
| `RESEND_FROM_EMAIL` | No | From address. Defaults to `koladedev@xophie.ai`. |

Example:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
# Optional:
# CONTACT_TO_EMAIL=you@example.com
# RESEND_FROM_EMAIL=koladedev@xophie.ai
```

## Resend dashboard

1. Create an account at [Resend](https://resend.com/).
2. Add and verify the **xophie.ai** domain (DNS records Resend provides).
3. Create an API key and set `RESEND_API_KEY`.

## Test locally

```bash
npm run dev
```

Submit the contact form, then confirm both emails (inbox + auto-reply) in Resend’s logs if needed.

## Security notes

- Keep `RESEND_API_KEY` server-only (never `NEXT_PUBLIC_*`).
- Consider rate limits or a honeypot later if you see abuse.
