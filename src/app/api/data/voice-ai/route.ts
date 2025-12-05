import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('profile')
      .select('voice_ai_enabled, voice_ai_script_url, voice_ai_sandbox_id, voice_ai_agent_id')
      .single();

    if (error) {
      console.error('Error fetching voice AI settings:', error);
      // Return default values if no settings found
      return NextResponse.json({
        voice_ai_enabled: false,
        voice_ai_script_url: '',
        voice_ai_sandbox_id: '',
        voice_ai_agent_id: '',
      });
    }

    return NextResponse.json(data || {
      voice_ai_enabled: false,
      voice_ai_script_url: '',
      voice_ai_sandbox_id: '',
      voice_ai_agent_id: '',
    });
  } catch (error) {
    console.error('Error in voice AI GET:', error);
    return NextResponse.json({
      voice_ai_enabled: false,
      voice_ai_script_url: '',
      voice_ai_sandbox_id: '',
      voice_ai_agent_id: '',
    });
  }
}

