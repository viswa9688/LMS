/*
  # Storage Setup for Course Assets

  1. Storage Buckets
    - course-thumbnails: For course thumbnail images
    - course-content: For course materials and resources
  
  2. Security
    - Public access for thumbnails
    - Authenticated access for course content
*/

-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('course-thumbnails', 'course-thumbnails', true),
  ('course-content', 'course-content', false)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for course-thumbnails bucket
CREATE POLICY "Thumbnails are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'course-thumbnails');

CREATE POLICY "Authenticated users can upload thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'course-thumbnails');

-- Set up security policies for course-content bucket
CREATE POLICY "Only authenticated users can access course content"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'course-content');

CREATE POLICY "Only instructors can upload course content"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'course-content' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'instructor'
    )
  );