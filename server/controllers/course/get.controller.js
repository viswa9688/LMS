import Course from '../../models/course.model.js';
import { createError } from '../../utils/error.js';
import { logger } from '../../utils/logger.js';

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

    logger.info(`Retrieved ${courses.length} courses`);

    res.json({
      success: true,
      data: courses.map(course => ({
        id: course._id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        instructorId: course.instructor._id,
        category: course.category,
        level: course.level,
        modules: course.modules || [],
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
      }))
    });
  } catch (error) {
    logger.error('Error fetching courses:', error);
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio')
      .lean();

    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    res.json({
      success: true,
      data: {
        id: course._id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        instructorId: course.instructor._id,
        category: course.category,
        level: course.level,
        modules: course.modules || [],
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
      }
    });
  } catch (error) {
    logger.error('Error fetching course:', error);
    next(error);
  }
};