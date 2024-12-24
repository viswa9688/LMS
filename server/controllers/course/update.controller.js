import Course from '../../models/course.model.js';
import { createError } from '../../utils/error.js';
import { logger } from '../../utils/logger.js';

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

    res.json({
      success: true,
      data: updatedCourse
    });
  } catch (error) {
    logger.error('Error updating course:', error);
    next(error);
  }
};