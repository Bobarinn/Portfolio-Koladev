import { createClient } from '@/lib/supabase/server';

// Profile data fetcher
export async function getProfile() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/data/profile`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    
    const data = await response.json();
    
    // Transform to match existing profile structure
    return {
      name: data.name,
      nickname: data.nickname,
      title: data.title,
      tagline: data.tagline,
      aim: data.aim,
      description: data.description,
      workSchedule: data.work_schedule,
      email: data.email,
      phone: data.phone,
      location: data.location,
      calendlyUrl: data.calendly_url,
      resumeUrl: data.resume_url,
      linkedinUrl: data.linkedin,
      image: data.image || '/profile.jpg',
      socials: [], // Will be fetched separately or included
      resume: {
        education: [],
        workExperience: [],
        projects: [],
        volunteering: [],
        certifications: [],
        technicalSkills: [],
        hobbies: [],
      },
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    // Return fallback data
    return {
      name: 'Kolade Abobarin',
      nickname: 'Kay',
      title: 'Builder | MBA/MSIS Candidate | Product-Driven Developer',
      tagline: 'From Idea to Scalable Product — Code, No-Code & AI',
      email: '',
      phone: '',
      location: '',
      calendlyUrl: '',
      resumeUrl: '/resume.pdf',
      linkedinUrl: '',
      socials: [],
      resume: {
        education: [],
        workExperience: [],
        projects: [],
        volunteering: [],
        certifications: [],
        technicalSkills: [],
        hobbies: [],
      },
    };
  }
}

// Projects data fetcher
export async function getProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/data/projects`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Experience data fetcher
export async function getExperience() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/data/experience`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch experience');
    }
    
    const data = await response.json();
    
    // Transform to match existing structure
    return data.map((exp: {
      role?: string;
      title?: string;
      company: string;
      location?: string;
      period?: string;
      duration?: string;
      achievements?: string[];
      impact?: string;
      description?: string;
      images?: string[];
    }) => ({
      title: exp.role || exp.title,
      company: exp.company,
      location: exp.location,
      period: exp.period || exp.duration,
      achievements: exp.achievements || (exp.impact ? [exp.impact] : []),
      description: exp.description,
      images: exp.images || [],
    }));
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

// Education data fetcher
export async function getEducation() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/data/education`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch education');
    }
    
    const data = await response.json();
    
    // Transform to match existing structure
    return data.map((edu: {
      institution?: string;
      school?: string;
      location?: string;
      degree: string;
      period?: string;
      year?: string;
      gpa?: string;
      relevant_coursework?: string[];
      images?: string[];
    }) => ({
      institution: edu.institution || edu.school,
      location: edu.location,
      degree: edu.degree,
      period: edu.period || edu.year,
      gpa: edu.gpa,
      relevantCoursework: edu.relevant_coursework || [],
      images: edu.images || [],
    }));
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
}

// Skills data fetcher
export async function getSkills() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/data/skills`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    
    const data = await response.json();
    
    // Transform to match existing skillCategories structure
    const categories = [
      {
        id: 'no-code',
        name: 'No-Code',
        description: 'Building fully functional applications without traditional coding using visual development platforms.',
        skills: data.grouped['no-code'] || [],
      },
      {
        id: 'code',
        name: 'Code',
        description: 'Developing custom applications and services using modern programming languages and frameworks.',
        skills: data.grouped['code'] || [],
      },
      {
        id: 'ai',
        name: 'AI/ML',
        description: 'Leveraging artificial intelligence and machine learning technologies to build intelligent applications.',
        skills: data.grouped['ai'] || [],
      },
    ];
    
    return categories;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

// Server-side data fetchers (for use in Server Components)
export async function getProfileServer() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function getProjectsServer() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return data?.map((project) => ({
      id: project.id,
      title: project.name || project.title,
      description: project.description,
      category: project.category,
      image: project.image || (project.images && project.images.length > 0 ? project.images[0] : '/projects/default.png'),
      images: project.images || (project.image ? [project.image] : []),
      tags: project.tags || project.tech_stack || [],
      demoUrl: project.demo_url || project.link,
      repoUrl: project.repo_url,
    })) || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getSkillsServer() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    const grouped = data.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push({
        name: skill.name,
        icon: skill.icon,
        proficiency: skill.proficiency || 5,
      });
      return acc;
    }, {} as Record<string, Array<{ name: string; icon?: string; proficiency: number }>>);

    return [
      {
        id: 'no-code',
        name: 'No-Code',
        description: 'Building fully functional applications without traditional coding using visual development platforms.',
        skills: grouped['no-code'] || [],
      },
      {
        id: 'code',
        name: 'Code',
        description: 'Developing custom applications and services using modern programming languages and frameworks.',
        skills: grouped['code'] || [],
      },
      {
        id: 'ai',
        name: 'AI/ML',
        description: 'Leveraging artificial intelligence and machine learning technologies to build intelligent applications.',
        skills: grouped['ai'] || [],
      },
    ];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

// Sidequests data fetcher
export async function getSideQuests() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/data/sidequests`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sidequests');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sidequests:', error);
    return [];
  }
}

// Server-side sidequests fetcher
export async function getSideQuestsServer() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('sidequests')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map((sidequest) => ({
      id: sidequest.id,
      title: sidequest.title,
      description: sidequest.description,
      image: sidequest.image || (sidequest.images && sidequest.images.length > 0 ? sidequest.images[0] : '/sidequests/default.png'),
      images: sidequest.images || (sidequest.image ? [sidequest.image] : []),
      tags: sidequest.tags || [],
      demoUrl: sidequest.demo_url,
      repoUrl: sidequest.repo_url,
    })) || [];
  } catch (error) {
    console.error('Error fetching sidequests:', error);
    return [];
  }
}

