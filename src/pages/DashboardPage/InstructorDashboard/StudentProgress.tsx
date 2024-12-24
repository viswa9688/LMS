import { Users } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

export const StudentProgress = () => {
  return (
    <DashboardCard
      title="Student Progress"
      icon={Users}
    >
      <div className="space-y-4">
        <p className="text-gray-600">No student data available yet.</p>
      </div>
    </DashboardCard>
  );
};