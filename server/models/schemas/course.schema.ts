import { Schema } from 'mongoose';
import { CourseLevel, ContentType, QuestionType } from '../../types/course.types';

const contentSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(ContentType),
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  url: String,
  content: String,
  duration: Number,
  order: {
    type: Number,
    required: true,
  },
});

const questionSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(QuestionType),
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: Schema.Types.Mixed,
  points: {
    type: Number,
    default: 1,
  },
});

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  timeLimit: Number,
  questions: [questionSchema],
  passingScore: {
    type: Number,
    default: 70,
  },
});

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  content: [contentSchema],
  quizzes: [quizSchema],
  order: {
    type: Number,
    required: true,
  },
});

export const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategories: [String],
  level: {
    type: String,
    enum: Object.values(CourseLevel),
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  modules: [moduleSchema],
  enrolledStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  ratings: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
}, {
  timestamps: true,
});