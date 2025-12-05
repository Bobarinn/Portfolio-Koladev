import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map data to match existing Project interface
    const mappedData = data.map((project) => ({
      id: project.id,
      title: project.name || project.title,
      description: project.description,
      category: project.category,
      image: project.image || (project.images && project.images.length > 0 ? project.images[0] : '/projects/default.png'),
      images: project.images || (project.image ? [project.image] : []),
      tags: project.tags || project.tech_stack || [],
      demoUrl: project.demo_url || project.link,
      repoUrl: project.repo_url,
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error in projects GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

