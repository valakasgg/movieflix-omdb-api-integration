import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import SearchBar from '../SearchBar';

jest.mock('framer-motion', () => {
  return {
    motion: {
      form: ({ children, onSubmit, className }: { children: React.ReactNode; onSubmit?: any; className?: string }) => (
        <form onSubmit={onSubmit} className={className}>
          {children}
        </form>
      ),
      div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className}>
          {children}
        </div>
      ),
    },
  };
});

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default empty query', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Titles, people, genres...');
    expect(input).toHaveValue('');
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('renders with initial query value', () => {
    render(<SearchBar initialQuery="test movie" />);
    
    const input = screen.getByPlaceholderText('Titles, people, genres...');
    expect(input).toHaveValue('test movie');
  });

  it('updates query value on input change', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Titles, people, genres...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new movie search' } });
    
    expect(input.value).toBe('new movie search');
  });

  it('navigates to search results on form submission', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Titles, people, genres...');
    const searchButton = screen.getByRole('button', { name: /Search/i });
    
    fireEvent.change(input, { target: { value: 'star wars' } });
    
    fireEvent.click(searchButton);
    
    expect(pushMock).toHaveBeenCalledWith('/?query=star%20wars&page=1');
  });

  it('navigates to search results on Enter key press', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Titles, people, genres...');
    
    fireEvent.change(input, { target: { value: 'inception' } });
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(pushMock).toHaveBeenCalledWith('/?query=inception&page=1');
  });

  it('does not navigate if search query is empty', () => {
    render(<SearchBar />);
    
    const searchButton = screen.getByRole('button', { name: /Search/i });
    
    fireEvent.click(searchButton);
    
    expect(pushMock).not.toHaveBeenCalled();
  });
});
