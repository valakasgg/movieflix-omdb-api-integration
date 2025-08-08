import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import ReviewForm from '../ReviewForm';
import { addReview } from '@/app/redux/slices/reviewsSlice';

jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
        <div className={className} onClick={onClick}>
          {children}
        </div>
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

jest.mock('@/app/redux/hooks', () => ({
  ...jest.requireActual('@/app/redux/hooks'),
  useAppDispatch: () => jest.fn(),
}));

describe('ReviewForm', () => {
  const mockMovieId = 'tt1234567';
  const mockOnSubmitReview = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    renderWithProviders(<ReviewForm movieId={mockMovieId} />);
    
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Review/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Review/i })).toBeInTheDocument();
  });

  it('allows users to input review data', () => {
    renderWithProviders(<ReviewForm movieId={mockMovieId} />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const commentInput = screen.getByLabelText(/Your Review/i);
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test review' } });
    
    expect(nameInput).toHaveValue('Test User');
    expect(commentInput).toHaveValue('This is a test review');
  });

  it('calls dispatch and onSubmitReview when form is submitted', async () => {
    const dispatchSpy = jest.spyOn(require('@/app/redux/hooks'), 'useAppDispatch').mockImplementation(() => jest.fn());
    
    renderWithProviders(<ReviewForm movieId={mockMovieId} onSubmitReview={mockOnSubmitReview} />);
    
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Your Review/i), { target: { value: 'This is a test review' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Submit Review/i }));
    
    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
      expect(mockOnSubmitReview).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Your Name/i)).toHaveValue('');
      expect(screen.getByLabelText(/Your Review/i)).toHaveValue('');
    });
  });

  it('displays success message after form submission', async () => {
    renderWithProviders(<ReviewForm movieId={mockMovieId} />);
    
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Your Review/i), { target: { value: 'This is a test review' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Submit Review/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Your review has been submitted successfully/i)).toBeInTheDocument();
    });
  });
});
