import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching education:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Include images in response
    const mappedData = data.map((edu) => ({
      ...edu,
      images: edu.images || [],
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error in education GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

