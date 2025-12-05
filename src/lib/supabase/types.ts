export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      profile: {
        Row: {
          id: string;
          name: string;
          nickname: string | null;
          title: string | null;
          tagline: string | null;
          aim: string | null;
          description: string | null;
          summary: string | null;
          work_schedule: string | null;
          email: string;
          phone: string | null;
          location: string | null;
          github: string | null;
          linkedin: string | null;
          calendly_url: string | null;
          resume_url: string | null;
          about_me: string | null;
          image: string | null;
          voice_ai_enabled: boolean | null;
          voice_ai_script_url: string | null;
          voice_ai_sandbox_id: string | null;
          voice_ai_agent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          nickname?: string | null;
          title?: string | null;
          tagline?: string | null;
          aim?: string | null;
          description?: string | null;
          summary?: string | null;
          work_schedule?: string | null;
          email: string;
          phone?: string | null;
          location?: string | null;
          github?: string | null;
          linkedin?: string | null;
          calendly_url?: string | null;
          resume_url?: string | null;
          about_me?: string | null;
          image?: string | null;
          voice_ai_enabled?: boolean | null;
          voice_ai_script_url?: string | null;
          voice_ai_sandbox_id?: string | null;
          voice_ai_agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          nickname?: string | null;
          title?: string | null;
          tagline?: string | null;
          aim?: string | null;
          description?: string | null;
          summary?: string | null;
          work_schedule?: string | null;
          email?: string;
          phone?: string | null;
          location?: string | null;
          github?: string | null;
          linkedin?: string | null;
          calendly_url?: string | null;
          resume_url?: string | null;
          about_me?: string | null;
          image?: string | null;
          voice_ai_enabled?: boolean | null;
          voice_ai_script_url?: string | null;
          voice_ai_sandbox_id?: string | null;
          voice_ai_agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      experience: {
        Row: {
          id: string;
          company: string;
          role: string;
          title: string | null;
          location: string | null;
          duration: string | null;
          period: string | null;
          description: string | null;
          impact: string | null;
          achievements: string[] | null;
          images: string[] | null;
          start_date: string | null;
          end_date: string | null;
          is_current: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          title?: string | null;
          location?: string | null;
          duration?: string | null;
          period?: string | null;
          description?: string | null;
          impact?: string | null;
          achievements?: string[] | null;
          images?: string[] | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company?: string;
          role?: string;
          title?: string | null;
          location?: string | null;
          duration?: string | null;
          period?: string | null;
          description?: string | null;
          impact?: string | null;
          achievements?: string[] | null;
          images?: string[] | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      education: {
        Row: {
          id: string;
          institution: string;
          school: string | null;
          degree: string;
          location: string | null;
          year: string | null;
          period: string | null;
          gpa: string | null;
          relevant_coursework: string[] | null;
          images: string[] | null;
          start_date: string | null;
          end_date: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institution: string;
          school?: string | null;
          degree: string;
          location?: string | null;
          year?: string | null;
          period?: string | null;
          gpa?: string | null;
          relevant_coursework?: string[] | null;
          images?: string[] | null;
          start_date?: string | null;
          end_date?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          institution?: string;
          school?: string | null;
          degree?: string;
          location?: string | null;
          year?: string | null;
          period?: string | null;
          gpa?: string | null;
          relevant_coursework?: string[] | null;
          images?: string[] | null;
          start_date?: string | null;
          end_date?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          title: string | null;
          description: string;
          tech_stack: string[] | null;
          tags: string[] | null;
          link: string | null;
          demo_url: string | null;
          repo_url: string | null;
          image: string | null;
          images: string[] | null;
          category: 'no-code' | 'code' | 'ai' | null;
          highlight: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          title?: string | null;
          description: string;
          tech_stack?: string[] | null;
          tags?: string[] | null;
          link?: string | null;
          demo_url?: string | null;
          repo_url?: string | null;
          image?: string | null;
          images?: string[] | null;
          category?: 'no-code' | 'code' | 'ai' | null;
          highlight?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          title?: string | null;
          description?: string;
          tech_stack?: string[] | null;
          tags?: string[] | null;
          link?: string | null;
          demo_url?: string | null;
          repo_url?: string | null;
          image?: string | null;
          images?: string[] | null;
          category?: 'no-code' | 'code' | 'ai' | null;
          highlight?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: 'no-code' | 'code' | 'ai';
          proficiency: number | null;
          icon: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: 'no-code' | 'code' | 'ai';
          proficiency?: number | null;
          icon?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: 'no-code' | 'code' | 'ai';
          proficiency?: number | null;
          icon?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      social_links: {
        Row: {
          id: string;
          name: string;
          url: string;
          icon: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          url: string;
          icon?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          url?: string;
          icon?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          institution: string;
          date: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          institution: string;
          date?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          institution?: string;
          date?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteering: {
        Row: {
          id: string;
          role: string;
          organization: string;
          period: string | null;
          description: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          role: string;
          organization: string;
          period?: string | null;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: string;
          organization?: string;
          period?: string | null;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      hobbies: {
        Row: {
          id: string;
          name: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      technical_skills: {
        Row: {
          id: string;
          skill: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          skill: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          skill?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      sidequests: {
        Row: {
          id: string;
          title: string;
          description: string;
          image: string | null;
          images: string[] | null;
          tags: string[] | null;
          demo_url: string | null;
          repo_url: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image?: string | null;
          images?: string[] | null;
          tags?: string[] | null;
          demo_url?: string | null;
          repo_url?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image?: string | null;
          images?: string[] | null;
          tags?: string[] | null;
          demo_url?: string | null;
          repo_url?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

