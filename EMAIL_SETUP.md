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

## Step 4: Update Your Code

1. Open `src/components/sections/ContactSection.tsx`
2. Replace the placeholder values with your actual EmailJS credentials:
   ```typescript
   const EMAILJS_SERVICE_ID = "your_service_id"; // Replace with your actual Service ID
   const EMAILJS_TEMPLATE_ID = "your_template_id"; // Replace with your actual Template ID 
   const EMAILJS_PUBLIC_KEY = "your_public_key"; // Replace with your Public Key
   ```
3. Your Public Key can be found in the EmailJS dashboard under Account > API Keys

## Step 5: Test the Form

1. Run your website locally: `npm run dev`
2. Fill out and submit the contact form
3. Check that you receive the email notification
4. Verify that the sender receives the auto-response with your Calendly link

## Additional Configuration (for auto-response)

If you want to set up a separate auto-response template:

1. Create a second template in EmailJS specifically for auto-responses
2. Update your code to send both emails:
   ```typescript
   // First send the notification to yourself
   await emailjs.sendForm(
     EMAILJS_SERVICE_ID,
     EMAILJS_TEMPLATE_ID,
     formRef.current,
     EMAILJS_PUBLIC_KEY
   );
   
   // Then send the auto-response
   await emailjs.send(
     EMAILJS_SERVICE_ID,
     EMAILJS_AUTORESPONSE_TEMPLATE_ID,
     {
       to_email: data.email,
       to_name: data.name,
       from_name: profile.name,
       calendly_link: profile.calendlyUrl,
     },
     EMAILJS_PUBLIC_KEY
   );
   ```

## Security Notes

- Never expose your EmailJS private key
- The public key is safe to include in client-side code
- Consider setting up email sending limits to prevent abuse 