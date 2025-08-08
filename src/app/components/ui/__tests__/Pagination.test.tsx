import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import Pagination from '../../ui/Pagination';

jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className}>
          {children}
        </div>
      ),
    },
  };
});

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} query="test" />
    );
    
    expect(container).toBeEmptyDOMElement();
  });

  it('renders pagination with correct page numbers', () => {
    render(<Pagination currentPage={3} totalPages={10} query="test" />);
    
    expect(screen.getByText('3')).toBeInTheDocument();
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    expect(screen.getByText('10')).toBeInTheDocument();
    
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} query="test" />);
    
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toHaveClass('cursor-not-allowed');
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} query="test" />);
    
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toHaveClass('cursor-not-allowed');
  });

  it('navigates to correct page when clicking page number', () => {
    render(<Pagination currentPage={3} totalPages={10} query="test query" />);
    
    fireEvent.click(screen.getByText('5'));
    
    expect(pushMock).toHaveBeenCalledWith('/?query=test%20query&page=5');
  });

  it('navigates to previous page when clicking previous button', () => {
    render(<Pagination currentPage={3} totalPages={10} query="test" />);
    
    fireEvent.click(screen.getByLabelText('Previous page'));
    
    expect(pushMock).toHaveBeenCalledWith('/?query=test&page=2');
  });

  it('navigates to next page when clicking next button', () => {
    render(<Pagination currentPage={3} totalPages={10} query="test" />);
    
    fireEvent.click(screen.getByLabelText('Next page'));
    
    expect(pushMock).toHaveBeenCalledWith('/?query=test&page=4');
  });
});
