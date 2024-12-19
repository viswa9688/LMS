export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'instructor' | 'student';
  avatar?: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  modules: Module[];
  createdAt: string;
  updatedAt: string;
};

export type Module = {
  id: string;
  title: string;
  content: Content[];
  quizzes: Quiz[];
  assignments: Assignment[];
};

export type Content = {
  id: string;
  type: 'video' | 'pdf' | 'text';
  title: string;
  url?: string;
  content?: string;
};

export type Quiz = {
  id: string;
  title: string;
  timeLimit?: number;
  questions: Question[];
};

export type Question = {
  id: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
};