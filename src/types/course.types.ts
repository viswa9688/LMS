export interface CourseFormData {
  title: string;
  description: string;
  thumbnail: File | string;
  instructorName: string;
  instructorBio?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discountPrice?: number;
  language: string;
}