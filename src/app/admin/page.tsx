'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ProfileEditor } from '@/components/admin/ProfileEditor';
import { ProjectsEditor } from '@/components/admin/ProjectsEditor';
import { ExperienceEditor } from '@/components/admin/ExperienceEditor';
import { EducationEditor } from '@/components/admin/EducationEditor';
import { SkillsEditor } from '@/components/admin/SkillsEditor';
import { FAQsEditor } from '@/components/admin/FAQsEditor';
import { SideQuestsEditor } from '@/components/admin/SideQuestsEditor';
import { VoiceAIEditor } from '@/components/admin/VoiceAIEditor';
import { LoginPage } from '@/components/admin/LoginPage';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  // Only create client when component mounts (client-side only)
  const supabase = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return createClient();
    } catch (error) {
      console.error('Failed to create Supabase client:', error);
      return null;
    }
  }, []);

  const checkAuth = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(user);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) {
      toast.error('Supabase client not available');
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Error logging out');
        return;
      }
      setIsAuthenticated(false);
      setUser(null);
      router.push('/admin');
      router.refresh();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p className="text-muted-foreground mb-4">
            Supabase environment variables are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.
          </p>
          <p className="text-sm text-muted-foreground">
            Check your Vercel project settings → Environment Variables
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolio data
              {user?.email && (
                <span className="ml-2 text-sm">• {user.email}</span>
              )}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
          >
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="sidequests">Sidequests</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="voice-ai">Voice AI</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileEditor />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectsEditor />
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <ExperienceEditor />
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <EducationEditor />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <SkillsEditor />
          </TabsContent>

          <TabsContent value="sidequests" className="mt-6">
            <SideQuestsEditor />
          </TabsContent>

          <TabsContent value="faqs" className="mt-6">
            <FAQsEditor />
          </TabsContent>

          <TabsContent value="voice-ai" className="mt-6">
            <VoiceAIEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

