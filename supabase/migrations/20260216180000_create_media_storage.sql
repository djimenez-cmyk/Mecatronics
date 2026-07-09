-- Create media_files table to track uploaded files
CREATE TABLE IF NOT EXISTS public.media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL UNIQUE,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_media_files_uploaded_by ON public.media_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_files_file_type ON public.media_files(file_type);
CREATE INDEX IF NOT EXISTS idx_media_files_created_at ON public.media_files(created_at DESC);

-- Enable RLS
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for media_files table
DROP POLICY IF EXISTS "authenticated_users_can_view_media" ON public.media_files;
CREATE POLICY "authenticated_users_can_view_media"
ON public.media_files
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "users_can_upload_media" ON public.media_files;
CREATE POLICY "users_can_upload_media"
ON public.media_files
FOR INSERT
TO authenticated
WITH CHECK (uploaded_by = auth.uid());

DROP POLICY IF EXISTS "users_can_delete_own_media" ON public.media_files;
CREATE POLICY "users_can_delete_own_media"
ON public.media_files
FOR DELETE
TO authenticated
USING (uploaded_by = auth.uid());

-- Storage bucket setup instructions
-- Note: Storage buckets must be created via Supabase Dashboard or API
-- Bucket name: 'media'
-- Public: false (authenticated users only)
-- File size limit: 50MB
-- Allowed MIME types: image/*, video/*, application/pdf

-- Storage RLS policies will be applied via Dashboard:
-- 1. Allow authenticated users to upload: bucket_id = 'media' AND auth.role() = 'authenticated'
-- 2. Allow authenticated users to read: bucket_id = 'media' AND auth.role() = 'authenticated'
-- 3. Allow users to delete own files: bucket_id = 'media' AND auth.uid() = owner