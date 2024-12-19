import { BookOpen, Plus } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { Button } from '../../../components/UI/Button';

export const MyCourses = () => {
  return (
    <DashboardCard
      title="My Courses"
      icon={BookOpen}
      action={
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Course
        </Button>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-600">You haven't created any courses yet.</p>
      </div>
    </DashboardCard>
  );
};