/*
  # Add public access policy for course thumbnails

  1. Changes
    - Add public access policy for course-thumbnails bucket
    - Ensures thumbnails are publicly accessible without authentication

  2. Security
    - Limited to SELECT operations only
    - Specific to course-thumbnails bucket
*/

-- Add public access policy for course thumbnails
CREATE POLICY "Public access to course thumbnails"
ON storage.objects
FOR SELECT
USING (bucket_id = 'course-thumbnails');

-- Ensure bucket is set to public
UPDATE storage.buckets
SET public = true
WHERE id = 'course-thumbnails';