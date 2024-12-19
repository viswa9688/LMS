import { LoginForm } from '../components/Auth/LoginForm';

export const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in to EduLMS</h2>
        <LoginForm />
      </div>
    </div>
  );
};