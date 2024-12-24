import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseForm } from '../CourseForm';
import { useAuthStore } from '../../../../store/authStore';
import { useCourseStore } from '../../../../store/courseStore';

// Mock the stores
jest.mock('../../../../store/authStore');
jest.mock('../../../../store/courseStore');

describe('CourseForm', () => {
  const mockUser = {
    id: '1',
    name: 'Test Instructor',
    email: 'test@example.com',
    role: 'instructor',
  };

  beforeEach(() => {
    (useAuthStore as jest.Mock).mockReturnValue({ user: mockUser });
    (useCourseStore as jest.Mock).mockReturnValue({
      addCourse: jest.fn(),
      loading: false,
    });
  });

  // Field Validation Tests
  test('shows validation errors for required fields', async () => {
    render(<CourseForm />);
    
    const submitButton = screen.getByRole('button', { name: /create course/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title must be at least 5 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/description must be at least 20 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a category/i)).toBeInTheDocument();
    });
  });

  // Price Input Test
  test('validates price input accepts only numbers', async () => {
    render(<CourseForm />);
    
    const priceInput = screen.getByLabelText(/price/i);
    await userEvent.type(priceInput, 'abc');
    
    expect(priceInput).toHaveValue('');
  });

  // Default Values Test
  test('loads with correct default values', () => {
    render(<CourseForm />);
    
    expect(screen.getByLabelText(/instructor name/i)).toHaveValue(mockUser.name);
    expect(screen.getByLabelText(/language/i)).toHaveValue('English');
  });

  // Successful Form Submission
  test('submits form with valid data', async () => {
    const mockAddCourse = jest.fn();
    (useCourseStore as jest.Mock).mockReturnValue({
      addCourse: mockAddCourse,
      loading: false,
    });

    render(<CourseForm />);

    // Fill in form fields
    await userEvent.type(screen.getByLabelText(/title/i), 'Test Course Title');
    await userEvent.type(screen.getByLabelText(/description/i), 'This is a test course description that is long enough');
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'programming');
    await userEvent.type(screen.getByLabelText(/price/i), '99.99');

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /create course/i }));

    await waitFor(() => {
      expect(mockAddCourse).toHaveBeenCalled();
    });
  });
});