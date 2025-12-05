import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching experience:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Include images in response
    const mappedData = data.map((exp) => ({
      ...exp,
      images: exp.images || [],
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error in experience GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

