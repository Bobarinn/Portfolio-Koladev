# Setting Up EmailJS for the Contact Form

This guide will help you set up EmailJS to handle form submissions from your portfolio website and send auto-responses that include your Calendly link.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. The free tier allows 200 emails per month, which is enough for most portfolio websites

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Give your service a name (e.g., "Portfolio Contact Form")
6. Note the Service ID for later use

## Step 3: Create Email Templates

### Main Template (for you to receive messages)
1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{reply_to}}` - Sender's email
   - `{{message}}` - The message content
4. Example content:
   ```
   New Message from Portfolio Contact Form

   Name: {{from_name}}
   Email: {{reply_to}}

   Message:
   {{message}}
   ```
5. Save the template and note the Template ID

### Auto-Response Template (optional)
1. Create another template for the auto-response to the person who submitted the form
2. Use variables like:
   - `{{from_name}}` - Sender's name
   - `{{calendly_link}}` - Your Calendly link
3. Example content:
   ```
   Hi {{from_name}},

   Thank you for contacting me! I've received your message and will get back to you as soon as possible.

   If you'd like to schedule a call directly, you can use my Calendly link:
   {{calendly_link}}

   Best regards,
   Kolade
   ```
4. Save the template and note the Template ID

## Step 4: Configure credentials (environment variables)

The contact form reads EmailJS settings from **public** env vars (safe for the browser). Create or edit `.env.local` in the project root:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
# Optional — omit if you skip the auto-response template
NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID=your_autoresponse_template_id
```

1. **Service ID** — from Email Services in the EmailJS dashboard  
2. **Template ID** — your main “notify me” template (see Step 3)  
3. **Public Key** — Account → API Keys in the EmailJS dashboard  
4. **Auto-response Template ID** — only if you created the second template; otherwise leave unset  

The form field `name` attributes are **`from_name`**, **`reply_to`**, and **`message`** so `sendForm` matches your main template variables `{{from_name}}`, `{{reply_to}}`, and `{{message}}`.

## Step 5: Test the Form

1. Run your website locally: `npm run dev`
2. Fill out and submit the contact form
3. Check that you receive the email notification
4. Verify that the sender receives the auto-response with your Calendly link

## Additional Configuration (for auto-response)

If you want to set up a separate auto-response template:

1. Create a second template in EmailJS specifically for auto-responses
2. The app sends the main notification with `sendForm`, then (if `NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID` is set) sends the auto-response with `send` and this payload so your template can use `{{from_name}}` and `{{calendly_link}}` (greeting uses the **visitor’s** name):
   ```typescript
   await emailjs.send(
     EMAILJS_SERVICE_ID,
     EMAILJS_AUTORESPONSE_TEMPLATE_ID,
     {
       to_email: data.reply_to,
       to_name: data.from_name,
       from_name: data.from_name,
       calendly_link: profile.calendlyUrl,
     },
     EMAILJS_PUBLIC_KEY
   );
   ```

## Security Notes

- Never expose your EmailJS private key
- The public key is safe to include in client-side code
- Consider setting up email sending limits to prevent abuse 