import { LineChart } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

export const LearningProgress = () => {
  return (
    <DashboardCard
      title="Learning Progress"
      icon={LineChart}
    >
      <div className="space-y-4">
        <p className="text-gray-600">Start learning to see your progress!</p>
      </div>
    </DashboardCard>
  );
};