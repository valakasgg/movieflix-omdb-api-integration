import { render, screen } from '@testing-library/react';
import BackButton from '../BackButton';

jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>;
    },
  };
});

jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className}>{children}</div>
      ),
    },
  };
});

describe('BackButton', () => {
  it('renders with default props', () => {
    render(<BackButton href="/" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<BackButton href="/" label="Go Home" />);
    
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('applies relative positioning by default', () => {
    render(<BackButton href="/" />);
    
    const container = screen.getByText('Back').closest('div');
    expect(container).toHaveClass('mt-4');
  });

  it('applies absolute positioning when specified', () => {
    render(<BackButton href="/" position="absolute" />);
    
    const container = screen.getByText('Back').closest('div');
    expect(container).toHaveClass('absolute');
  });

  it('applies additional custom classes', () => {
    render(<BackButton href="/" className="custom-class" />);
    
    const container = screen.getByText('Back').closest('div');
    expect(container).toHaveClass('custom-class');
  });
});
