import Course from '../../models/course.model.js';
import { createError } from '../../utils/error.js';
import { logger } from '../../utils/logger.js';

export const createCourse = async (req, res, next) => {
  try {
    logger.info('Creating new course', { userId: req.user._id });

    // Validate and sanitize input data
    const courseData = {
      title: req.body.title?.trim(),
      description: req.body.description?.trim(),
      category: req.body.category,
      level: req.body.level,
      price: Number(req.body.price) || 0,
      language: req.body.language || 'English',
      thumbnail: req.body.thumbnail || 'https://via.placeholder.com/800x400',
      instructor: req.user._id,
      instructorName: req.user.name, // Use authenticated user's name
      status: 'draft', // Default status
    };

    const course = await Course.create(courseData);

    logger.info('Course created successfully', { courseId: course._id });

    res.status(201).json({
      success: true,
      data: {
        id: course._id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        instructor: {
          id: req.user._id,
          name: req.user.name,
        },
        category: course.category,
        level: course.level,
        price: course.price,
        language: course.language,
        status: course.status,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
      },
    });
  } catch (error) {
    logger.error('Error creating course:', error);
    next(error);
  }
};