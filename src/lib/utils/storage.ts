import { createClient } from '@/lib/supabase/client';

const MEAL_PHOTOS_BUCKET = 'meal-photos';

export async function uploadMealPhoto(
  file: File,
  userId: string
): Promise<{ path: string; url: string } | null> {
  const supabase = createClient();

  const fileExt = file.name.split('.').pop() ?? 'jpg';
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(MEAL_PHOTOS_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload failed:', error.message);
    return null;
  }

  const url = getPublicUrl(MEAL_PHOTOS_BUCKET, data.path);

  return { path: data.path, url };
}

export function getPublicUrl(bucket: string, path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function deletePhoto(
  bucket: string,
  path: string
): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error('Delete failed:', error.message);
    return false;
  }

  return true;
}
