import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedContent: [{
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  quizResults: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    score: Number,
    maxScore: Number,
    attempts: Number,
    lastAttemptDate: Date,
  }],
  assignmentSubmissions: [{
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    submissionUrl: String,
    grade: Number,
    feedback: String,
    submittedAt: Date,
    gradedAt: Date,
  }],
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
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

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;