# Admin Dashboard Documentation

## Overview

The admin dashboard allows you to manage your portfolio data through a user-friendly interface instead of editing hardcoded TypeScript files.

## Accessing the Dashboard

1. Navigate to `/admin` in your application
2. Enter your admin password (set in `NEXT_PUBLIC_ADMIN_PASSWORD` environment variable)
3. Click "Login"

## Features

### 1. Profile Management
- Update your name, nickname, title, tagline
- Edit contact information (email, phone, location)
- Update social media links (GitHub, LinkedIn)
- Edit your description, summary, and work schedule
- Manage Calendly URL and resume URL

### 2. Projects Management
- Add new projects
- Edit existing projects
- Delete projects
- Set project categories (No-Code, Code, AI)
- Add tags to projects
- Set demo URLs and repository URLs
- Upload project images

### 3. Experience Management
- Add work experience entries
- Edit experience details (company, role, location, period)
- Add achievements for each experience
- Delete experience entries
- Set display order

### 4. Education Management
- Add education entries
- Edit education details (institution, degree, location, period)
- Add relevant coursework
- Set GPA
- Delete education entries

### 5. Skills Management
- Add skills with categories (No-Code, Code, AI)
- Set proficiency levels (1-10)
- Edit skill names and icons
- Delete skills
- View skills grouped by category

### 6. FAQs Management
- Add frequently asked questions
- Edit questions and answers
- Delete FAQs
- Set display order

## Data Structure

### Profile
- Single profile record (one row in the database)
- Contains all personal information
- Updated through the Profile tab

### Projects
- Multiple project records
- Each project has:
  - Name/Title
  - Description
  - Category (no-code, code, ai)
  - Image URL
  - Tags (array)
  - Demo URL (optional)
  - Repository URL (optional)
  - Highlight flag (optional)

### Experience
- Multiple experience records
- Each experience has:
  - Company
  - Role/Title
  - Location
  - Period/Duration
  - Description
  - Achievements (array)

### Education
- Multiple education records
- Each education has:
  - Institution
  - Degree
  - Location
  - Period/Year
  - GPA (optional)
  - Relevant Coursework (array)

### Skills
- Multiple skill records
- Each skill has:
  - Name
  - Category (no-code, code, ai)
  - Proficiency (1-10)
  - Icon (optional)

### FAQs
- Multiple FAQ records
- Each FAQ has:
  - Question
  - Answer
  - Display order

## API Endpoints

The admin dashboard uses the following API endpoints:

### Profile
- `GET /api/admin/profile` - Get profile data
- `PUT /api/admin/profile` - Update profile data

### Projects
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects` - Update project
- `DELETE /api/admin/projects?id={id}` - Delete project

### Experience
- `GET /api/admin/experience` - Get all experiences
- `POST /api/admin/experience` - Create new experience
- `PUT /api/admin/experience` - Update experience
- `DELETE /api/admin/experience?id={id}` - Delete experience

### Education
- `GET /api/admin/education` - Get all education entries
- `POST /api/admin/education` - Create new education entry
- `PUT /api/admin/education` - Update education entry
- `DELETE /api/admin/education?id={id}` - Delete education entry

### Skills
- `GET /api/admin/skills` - Get all skills
- `POST /api/admin/skills` - Create new skill
- `PUT /api/admin/skills` - Update skill
- `DELETE /api/admin/skills?id={id}` - Delete skill

### FAQs
- `GET /api/admin/faqs` - Get all FAQs
- `POST /api/admin/faqs` - Create new FAQ
- `PUT /api/admin/faqs` - Update FAQ
- `DELETE /api/admin/faqs?id={id}` - Delete FAQ

## Authentication

Currently, the admin dashboard uses a simple password-based authentication:

1. Password is stored in `NEXT_PUBLIC_ADMIN_PASSWORD` environment variable
2. Password is checked client-side (not secure for production)
3. Token is stored in sessionStorage

### For Production

For production, you should:
1. Implement Supabase Auth for proper authentication
2. Use server-side session management
3. Add role-based access control
4. Implement rate limiting
5. Add audit logging

## Migrating from TypeScript Files

To migrate your existing data:

1. Export data from your TypeScript files
2. Use the admin dashboard to add data manually, OR
3. Create a migration script to import data directly to Supabase

Example migration script structure:
```typescript
// scripts/migrate-data.ts
import { createAdminClient } from '@/lib/supabase/server';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

async function migrate() {
  const supabase = createAdminClient();
  
  // Migrate profile
  await supabase.from('profile').upsert({
    name: profile.name,
    email: profile.email,
    // ... other fields
  });
  
  // Migrate projects
  for (const project of projects) {
    await supabase.from('projects').insert({
      name: project.title,
      description: project.description,
      // ... other fields
    });
  }
}
```

## Best Practices

1. **Regular Backups**: Set up automatic backups in Supabase
2. **Version Control**: Consider using Supabase migrations for schema changes
3. **Data Validation**: Validate data before saving
4. **Error Handling**: Always handle errors gracefully
5. **Loading States**: Show loading indicators during operations
6. **Confirmation Dialogs**: Ask for confirmation before deleting data
7. **Form Validation**: Validate forms before submission
8. **Responsive Design**: Ensure dashboard works on mobile devices

## Troubleshooting

### Data not saving
- Check browser console for errors
- Verify API endpoints are working
- Check Supabase dashboard for database errors
- Verify environment variables are set correctly

### Can't login
- Verify `NEXT_PUBLIC_ADMIN_PASSWORD` is set
- Clear browser cache and sessionStorage
- Check browser console for errors

### Images not displaying
- Verify image URLs are correct
- Check that images are accessible
- Use absolute URLs or relative paths from public folder

## Future Enhancements

- [ ] Image upload functionality
- [ ] Rich text editor for descriptions
- [ ] Drag-and-drop reordering
- [ ] Bulk operations
- [ ] Data export/import
- [ ] Audit logging
- [ ] User roles and permissions
- [ ] Email notifications for changes
- [ ] Analytics dashboard
- [ ] Content preview before publishing






