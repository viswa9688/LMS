import Course from '../../models/course.model.js';
import { createError } from '../../utils/error.js';
import { logger } from '../../utils/logger.js';

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

    await course.deleteOne();
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting course:', error);
    next(error);
  }
};