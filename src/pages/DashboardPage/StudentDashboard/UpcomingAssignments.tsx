import { Calendar } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

export const UpcomingAssignments = () => {
  return (
    <DashboardCard
      title="Upcoming Assignments"
      icon={Calendar}
    >
      <div className="space-y-4">
        <p className="text-gray-600">No upcoming assignments.</p>
      </div>
    </DashboardCard>
  );
};