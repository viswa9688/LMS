import { BookOpen, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardCard } from '../components/DashboardCard';
import { Button } from '../../../components/UI/Button';

export const MyCourses = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate('/dashboard/courses/new');
  };

  return (
    <DashboardCard
      title="My Courses"
      icon={BookOpen}
      action={
        <Button 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleCreateCourse}
        >
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