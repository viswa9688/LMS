import Course from '../../models/course.model.js';
import { createError } from '../../utils/error.js';
import { logger } from '../../utils/logger.js';

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, level, price, language, instructorName, instructorBio, thumbnail } = req.body;

    // Log the incoming request data
    console.log('Incoming course data:', req.body);

    // Validate thumbnail URL
    try {
      new URL(thumbnail);
    } catch (e) {
      logger.error('Invalid thumbnail URL:', { thumbnail });
      return next(createError(400, 'Invalid thumbnail URL'));
    }

    // Proceed with creating the course
    const courseData = {
      title,
      description,
      category,
      level,
      price,
      language,
      instructorName,
      instructorBio,
      thumbnail,
    };

    // Assume saveCourse is a function that saves the course to the database
    const newCourse = await saveCourse(courseData);

    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    // Log detailed error information
    logger.error('Error creating course:', {
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    next(error);
  }
};