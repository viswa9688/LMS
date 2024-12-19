import { BookOpen } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

export const EnrolledCourses = () => {
  return (
    <DashboardCard
      title="Enrolled Courses"
      icon={BookOpen}
      footer={
        <a href="/courses" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          Browse more courses
        </a>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
      </div>
    </DashboardCard>
  );
};