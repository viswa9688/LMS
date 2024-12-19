import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';
import { protect, instructor } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, instructor, createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(protect, instructor, updateCourse)
  .delete(protect, instructor, deleteCourse);

export default router;