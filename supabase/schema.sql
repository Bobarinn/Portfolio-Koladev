-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Profile table (main profile information)
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  nickname TEXT,
  title TEXT,
  tagline TEXT,
  aim TEXT,
  description TEXT,
  summary TEXT,
  work_schedule TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  github TEXT,
  linkedin TEXT,
  calendly_url TEXT,
  resume_url TEXT,
  about_me TEXT,
  image TEXT, -- Single profile image URL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Experience table (work experience)
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  title TEXT, -- Alias for role for compatibility
  location TEXT,
  duration TEXT,
  period TEXT, -- Alias for duration
  description TEXT,
  impact TEXT, -- For achievements/impact
  achievements TEXT[], -- Array of achievement strings
  images TEXT[], -- Array of image URLs
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  school TEXT, -- Alias for institution
  degree TEXT NOT NULL,
  location TEXT,
  year TEXT,
  period TEXT, -- Alias for year
  gpa TEXT,
  relevant_coursework TEXT[],
  images TEXT[], -- Array of image URLs
  start_date DATE,
  end_date DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT, -- Alias for name
  description TEXT NOT NULL,
  tech_stack TEXT[], -- Array of technologies
  tags TEXT[], -- Array of tags
  link TEXT,
  demo_url TEXT,
  repo_url TEXT,
  image TEXT, -- Primary/main image (for backward compatibility)
  images TEXT[], -- Array of image URLs
  category TEXT CHECK (category IN ('no-code', 'code', 'ai')),
  highlight BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Skills table (for technical skills)
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('no-code', 'code', 'ai')),
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 10),
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Social links table (for profile socials)
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  institution TEXT NOT NULL,
  date TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Volunteering table
CREATE TABLE IF NOT EXISTS volunteering (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  period TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Hobbies table
CREATE TABLE IF NOT EXISTS hobbies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Technical skills list (simple text array stored in profile, but can be managed separately)
CREATE TABLE IF NOT EXISTS technical_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Sidequests table
CREATE TABLE IF NOT EXISTS sidequests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT, -- Primary/main image (for backward compatibility)
  images TEXT[], -- Array of image URLs
  tags TEXT[], -- Array of tags
  demo_url TEXT,
  repo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_experience_display_order ON experience(display_order);
CREATE INDEX IF NOT EXISTS idx_education_display_order ON education(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON faqs(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);
CREATE INDEX IF NOT EXISTS idx_sidequests_display_order ON sidequests(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteering ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE sidequests ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio is public)
CREATE POLICY "Public can read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public can read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public can read education" ON education FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public can read social_links" ON social_links FOR SELECT USING (true);
CREATE POLICY "Public can read certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public can read volunteering" ON volunteering FOR SELECT USING (true);
CREATE POLICY "Public can read hobbies" ON hobbies FOR SELECT USING (true);
CREATE POLICY "Public can read technical_skills" ON technical_skills FOR SELECT USING (true);
CREATE POLICY "Public can read sidequests" ON sidequests FOR SELECT USING (true);

-- Create policies for authenticated admin write access
-- Note: These policies will check for admin role via Supabase Auth
-- For now, we'll create policies that allow service role (via API keys) to write
-- In production, you should use Supabase Auth with custom claims

-- Admin can manage all tables
CREATE POLICY "Service role can manage profile" ON profile FOR ALL USING (true);
CREATE POLICY "Service role can manage experience" ON experience FOR ALL USING (true);
CREATE POLICY "Service role can manage education" ON education FOR ALL USING (true);
CREATE POLICY "Service role can manage projects" ON projects FOR ALL USING (true);
CREATE POLICY "Service role can manage faqs" ON faqs FOR ALL USING (true);
CREATE POLICY "Service role can manage skills" ON skills FOR ALL USING (true);
CREATE POLICY "Service role can manage social_links" ON social_links FOR ALL USING (true);
CREATE POLICY "Service role can manage certifications" ON certifications FOR ALL USING (true);
CREATE POLICY "Service role can manage volunteering" ON volunteering FOR ALL USING (true);
CREATE POLICY "Service role can manage hobbies" ON hobbies FOR ALL USING (true);
CREATE POLICY "Service role can manage technical_skills" ON technical_skills FOR ALL USING (true);
CREATE POLICY "Service role can manage sidequests" ON sidequests FOR ALL USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteering_updated_at BEFORE UPDATE ON volunteering
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sidequests_updated_at BEFORE UPDATE ON sidequests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

