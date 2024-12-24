import Course from '../models/course.model.js';
import { createError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

export const createCourse = async (req, res, next) => {
  try {
    logger.info('Creating new course', { userId: req.user._id });

    // Create course with validated data
    const courseData = {
      ...req.body,
      instructor: req.user._id,
      // If thumbnail is a File, we'd handle file upload here
      // For now, using a placeholder image
      thumbnail: req.body.thumbnail instanceof File 
        ? 'https://via.placeholder.com/800x400'
        : req.body.thumbnail,
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
        discountPrice: course.discountPrice,
        language: course.language,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
      },
    });
  } catch (error) {
    logger.error('Error creating course:', error);
    next(error);
  }
};

// ... rest of the controller code remains the same