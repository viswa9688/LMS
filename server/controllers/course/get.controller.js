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

    // Transform the data to ensure consistent structure
    const transformedCourses = courses.map(course => ({
      id: course._id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop',
      instructor: {
        id: course.instructor._id,
        name: course.instructor.name,
        avatar: course.instructor.avatar,
      },
      category: course.category,
      level: course.level,
      price: course.price,
      language: course.language,
      status: course.status,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }));

    res.json({
      success: true,
      data: transformedCourses,
    });
  } catch (error) {
    logger.error('Error fetching courses:', error);
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar')
      .lean();

    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    // Transform the data to match the frontend structure
    const transformedCourse = {
      id: course._id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop',
      instructor: {
        id: course.instructor._id,
        name: course.instructor.name,
        avatar: course.instructor.avatar,
      },
      category: course.category,
      level: course.level,
      price: course.price,
      language: course.language,
      status: course.status,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };

    res.json({
      success: true,
      data: transformedCourse,
    });
  } catch (error) {
    logger.error('Error fetching course:', error);
    next(error);
  }
};