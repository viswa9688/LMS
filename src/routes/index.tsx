import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { HomePage } from '../pages/HomePage';
import { CoursesPage } from '../pages/CoursesPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { StudentDashboard } from '../pages/DashboardPage/StudentDashboard';
import { InstructorDashboard } from '../pages/DashboardPage/InstructorDashboard';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <StudentDashboard />,
          },
          {
            path: 'instructor',
            element: <InstructorDashboard />,
          },
        ],
      },
    ],
  },
]);