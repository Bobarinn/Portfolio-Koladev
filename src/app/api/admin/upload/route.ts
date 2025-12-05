import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { uploadImage, STORAGE_BUCKETS, type StorageBucket } from '@/lib/supabase/storage';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as StorageBucket;
    const path = formData.get('path') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!bucket || !Object.values(STORAGE_BUCKETS).includes(bucket)) {
      return NextResponse.json({ error: 'Invalid bucket' }, { status: 400 });
    }

    // Generate path if not provided
    const filePath = path || `${Date.now()}-${file.name}`;

    // Upload the image
    const publicUrl = await uploadImage(bucket, file, filePath);

    return NextResponse.json({ url: publicUrl, path: filePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const { extractBucketFromUrl, extractPathFromUrl, deleteImage: deleteImageFile } = await import('@/lib/supabase/storage');
    
    const bucket = extractBucketFromUrl(url) as StorageBucket | null;
    const path = extractPathFromUrl(url);

    if (!bucket || !path) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    await deleteImageFile(bucket, path);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete image' },
      { status: 500 }
    );
  }
}

