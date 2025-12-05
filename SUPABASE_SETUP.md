# Supabase Setup Guide

This guide will help you set up Supabase for your portfolio admin dashboard.

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: `kolade-portfolio` (or your preferred name)
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (takes 1-2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Open the file `supabase/schema.sql` from this project
3. Copy the entire SQL content
4. Paste it into the SQL Editor in Supabase
5. Click "Run" to execute the SQL
6. Verify that all tables are created by going to "Table Editor"

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to "Settings" → "API"
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role key** (this is your `SUPABASE_SERVICE_ROLE_KEY`) - Keep this secret!

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Dashboard Password (change this!)
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Site URL (for data fetching in server components)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Replace the placeholder values with your actual Supabase credentials
4. **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 5: Migrate Existing Data (Optional)

If you have existing data in your TypeScript files, you can migrate it:

1. Run the migration script (coming soon) or manually add data through the admin dashboard
2. Go to `/admin` in your application
3. Login with your admin password
4. Add your profile, projects, experience, education, skills, and FAQs through the dashboard

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/admin`
3. Login with your admin password
4. Try adding a test profile entry
5. Verify it appears in your Supabase dashboard under "Table Editor" → "profile"

## Step 7: Update Row Level Security (RLS) Policies

The schema includes RLS policies that allow:
- **Public read access**: Anyone can read profile, projects, experience, etc.
- **Service role write access**: Only the service role (admin API) can write

For production, you may want to:
1. Add authentication to the admin dashboard (Supabase Auth)
2. Create more restrictive RLS policies
3. Add rate limiting to API routes

## Troubleshooting

### Error: "SUPABASE_SERVICE_ROLE_KEY is not set"
- Make sure you've added `SUPABASE_SERVICE_ROLE_KEY` to your `.env.local` file
- Restart your development server after adding environment variables

### Error: "Failed to fetch profile"
- Check that your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Verify that the database schema has been created
- Check the Supabase dashboard for any error messages

### Admin password not working
- Make sure `NEXT_PUBLIC_ADMIN_PASSWORD` is set in your `.env.local` file
- Restart your development server after adding the environment variable
- The default password is `admin123` (change this in production!)

## Production Deployment

### Vercel Deployment

1. Add environment variables in Vercel dashboard:
   - Go to your project → Settings → Environment Variables
   - Add all the environment variables from `.env.local`
   - Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g., `https://kolade.pro`)

2. Deploy your application:
   ```bash
   vercel deploy
   ```

### Security Considerations

1. **Change the admin password** before deploying to production
2. **Use Supabase Auth** for proper authentication instead of simple password
3. **Enable rate limiting** on API routes
4. **Monitor API usage** in Supabase dashboard
5. **Set up backups** for your Supabase database
6. **Use environment variables** for all sensitive data

## Next Steps

1. Set up Supabase Auth for proper authentication
2. Add image upload functionality for projects
3. Set up database backups
4. Add analytics to track portfolio views
5. Implement caching for better performance

## Support

If you encounter any issues:
1. Check the Supabase documentation: https://supabase.com/docs
2. Check the Next.js documentation: https://nextjs.org/docs
3. Review the error messages in your browser console and server logs






