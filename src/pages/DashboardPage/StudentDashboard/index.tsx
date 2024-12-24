import { EnrolledCourses } from './EnrolledCourses';
import { LearningProgress } from './LearningProgress';
import { UpcomingAssignments } from './UpcomingAssignments';

export const StudentDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EnrolledCourses />
      <LearningProgress />
      <UpcomingAssignments />
    </div>
  );
};