import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('sidequests')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sidequests:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map data to match existing SideQuest interface
    const mappedData = data.map((sidequest) => ({
      id: sidequest.id,
      title: sidequest.title,
      description: sidequest.description,
      image: sidequest.image || (sidequest.images && sidequest.images.length > 0 ? sidequest.images[0] : '/sidequests/default.png'),
      images: sidequest.images || (sidequest.image ? [sidequest.image] : []),
      tags: sidequest.tags || [],
      demoUrl: sidequest.demo_url,
      repoUrl: sidequest.repo_url,
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error in sidequests GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}






