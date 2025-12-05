import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching skills:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Group by category
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

    return NextResponse.json({ data, grouped });
  } catch (error) {
    console.error('Error in skills GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}






