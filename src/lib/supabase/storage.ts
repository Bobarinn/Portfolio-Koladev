import { createAdminClient } from './server';

// Storage bucket names
export const STORAGE_BUCKETS = {
  profile: 'profile-images',
  projects: 'project-images',
  experience: 'experience-images',
  education: 'education-images',
  sidequests: 'sidequest-images',
} as const;

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

/**
 * Upload an image to Supabase Storage
 * @param bucket - Storage bucket name
 * @param file - File to upload
 * @param path - Path in the bucket (e.g., 'project-1/image1.jpg')
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  bucket: StorageBucket,
  file: File,
  path: string
): Promise<string> {
  try {
    const supabase = createAdminClient();
    
    // Ensure the bucket exists (create if it doesn't)
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      throw new Error(`Failed to list buckets: ${bucketsError.message}`);
    }

    const bucketExists = buckets?.some(b => b.name === bucket);
    if (!bucketExists) {
      // Create bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      });
      
      if (createError) {
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }
    }

    // Upload the file
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 * @param bucket - Storage bucket name
 * @param path - Path in the bucket
 */
export async function deleteImage(bucket: StorageBucket, path: string): Promise<void> {
  try {
    const supabase = createAdminClient();
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Extract path from Supabase Storage URL
 * @param url - Full Supabase Storage URL
 * @returns Path in the bucket
 */
export function extractPathFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Extract path after bucket name
    const match = urlObj.pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    return match ? match[2] : null;
  } catch {
    return null;
  }
}

/**
 * Get bucket name from Supabase Storage URL
 * @param url - Full Supabase Storage URL
 * @returns Bucket name
 */
export function extractBucketFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const match = urlObj.pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\//);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}






