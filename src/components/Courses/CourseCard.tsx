import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
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
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{course.modules.length} modules</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>
                {course.modules.reduce((acc, module) => 
                  acc + module.content.length, 0)} lessons
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>24 students</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}