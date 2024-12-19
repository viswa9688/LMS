import { Schema } from 'mongoose';

export const progressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedContent: [{
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  quizResults: [{
    quizId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    score: Number,
    maxScore: Number,
    attempts: Number,
    lastAttemptDate: Date,
  }],
  completionStatus: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started',
  },
  completionDate: Date,
  certificateIssued: {
    type: Boolean,
    default: false,
  },
  certificateUrl: String,
}, {
  timestamps: true,
});