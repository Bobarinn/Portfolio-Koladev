import { createClient } from '@/lib/supabase/server';

export async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }

    // Optionally check if user has admin role
    // You can add role checking here if you have a users table with roles
    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}






