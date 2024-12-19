import Course from '../models/course.model.js';
import { createError } from '../utils/error.js';

export const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
    });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const { category, level, search, sort = '-createdAt' } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(query)
      .populate('instructor', 'name avatar')
      .sort(sort)
      .lean();

    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio')
      .populate('enrolledStudents', 'name avatar')
      .lean();

    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    if (course.instructor.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return next(createError(403, 'Not authorized'));
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    if (course.instructor.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return next(createError(403, 'Not authorized'));
    }

    await course.remove();
    res.json({ message: 'Course removed' });
  } catch (error) {
    next(error);
  }
};