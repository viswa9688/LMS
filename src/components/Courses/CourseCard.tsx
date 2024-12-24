import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import { Course } from '../../types';
import { logger } from '../../utils/logger';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop';
  const [imgSrc, setImgSrc] = React.useState<string>(course.thumbnail || fallbackImage);

  React.useEffect(() => {
    logger.info('Course card mounted:', {
      courseId: course.id,
      thumbnail: course.thumbnail,
      currentImgSrc: imgSrc
    });
  }, [course.id, course.thumbnail, imgSrc]);

  const handleImageError = () => {
    logger.warn('Course image failed to load:', {
      courseId: course.id,
      failedUrl: imgSrc
    });
    if (imgSrc !== fallbackImage) {
      setImgSrc(fallbackImage);
    }
  };

  return (
    <Link to={`/courses/${course.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative pt-[56.25%]">
          <img
            src={imgSrc}
            alt={course.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm px-3 py-1 rounded-full ${
              course.level === 'beginner' ? 'bg-green-100 text-green-800' :
              course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </span>
            <span className="text-sm text-gray-500">{course.category}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{course.instructor.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{course.price === 0 ? 'Free' : `$${course.price}`}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};