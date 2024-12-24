/*
  # Update storage policies for course thumbnails

  1. Changes
    - Add more permissive policies for course thumbnails bucket
    - Ensure public access to thumbnails
    - Allow authenticated users to upload thumbnails
    - Add size and type restrictions

  2. Security
    - Maintain public read access for thumbnails
    - Restrict upload permissions to authenticated users
    - Add file size and type validations
*/

-- Ensure the course-thumbnails bucket exists with correct settings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-thumbnails',
  'Course Thumbnails',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif'];

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public read access for course thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to course thumbnails" ON storage.objects;

-- Create new policies
CREATE POLICY "Public read access for course thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-thumbnails');

CREATE POLICY "Allow authenticated uploads to course thumbnails"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'course-thumbnails' AND
  (LENGTH(COALESCE(name, '')) <= 255)
);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;