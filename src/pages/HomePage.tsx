import { Link } from 'react-router-dom';
import { BookOpen, Users, Award } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Welcome to EduLMS
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your gateway to interactive learning experiences. Join our community of learners and instructors.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/courses"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-6 py-3 rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: BookOpen,
            title: 'Quality Content',
            description: 'Access high-quality courses created by industry experts',
          },
          {
            icon: Users,
            title: 'Active Community',
            description: 'Learn and grow with a supportive community of learners',
          },
          {
            icon: Award,
            title: 'Certification',
            description: 'Earn certificates upon successful course completion',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-white p-6 rounded-lg shadow-sm text-center"
          >
            <feature.icon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};