import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/course/index.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { courseSchema } from '../utils/validation/courseSchema.js';

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Protected routes
router.use(protect); // Apply protection to all routes below
router.post('/api/courses', async (req, res) => {
  try {
    console.log('Received data:', req.body); // Log the incoming data
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    console.error('Error saving course:', error);
    res.status(500).send({ error: 'Failed to save course' });
  }
});
// Instructor/Admin only routes
router.post('/', authorize('instructor', 'admin'), validate(courseSchema), createCourse);
router.put('/:id', authorize('instructor', 'admin'), validate(courseSchema), updateCourse);
router.delete('/:id', authorize('instructor', 'admin'), deleteCourse);

export default router;