import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { isAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('profile')
      .select('voice_ai_enabled, voice_ai_script_url, voice_ai_sandbox_id, voice_ai_agent_id')
      .single();

    if (error) {
      console.error('Error fetching voice AI settings:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Error in voice AI GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const body = await request.json();

    // Get existing profile to update
    const { data: existing } = await supabase
      .from('profile')
      .select('id')
      .single();

    if (!existing) {
      return NextResponse.json({ error: 'No profile found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('profile')
      .update({
        voice_ai_enabled: body.voice_ai_enabled,
        voice_ai_script_url: body.voice_ai_script_url,
        voice_ai_sandbox_id: body.voice_ai_sandbox_id,
        voice_ai_agent_id: body.voice_ai_agent_id,
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating voice AI settings:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in voice AI PUT:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

