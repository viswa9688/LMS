import { BarChart } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

export const CourseAnalytics = () => {
  return (
    <DashboardCard
      title="Course Analytics"
      icon={BarChart}
    >
      <div className="space-y-4">
        <p className="text-gray-600">Create courses to see analytics.</p>
      </div>
    </DashboardCard>
  );
};