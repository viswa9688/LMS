import { MyCourses } from './MyCourses';
import { StudentProgress } from './StudentProgress';
import { CourseAnalytics } from './CourseAnalytics';

export const InstructorDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MyCourses />
      <StudentProgress />
      <CourseAnalytics />
    </div>
  );
};