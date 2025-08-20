import { screen } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "@/test/test-utils";
import MovieCard from "../MovieCard";
import { MovieDetails } from "@/app/types";

const originalUseEffect = React.useEffect;
React.useEffect = (callback, deps) =>
  originalUseEffect(() => {
    return callback();
  }, deps);

jest.mock("framer-motion", () => {
  return {
    motion: {
      div: ({
        children,
        className,
        onClick,
        onHoverStart,
        onHoverEnd,
      }: {
        children: React.ReactNode;
        className?: string;
        onClick?: () => void;
        onHoverStart?: () => void;
        onHoverEnd?: () => void;
      }) => (
        <div
          className={className}
          onClick={onClick}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          {children}
        </div>
      ),
      button: ({
        children,
        className,
        onClick,
        whileHover,
        whileTap,
        "aria-label": ariaLabel,
      }: {
        children: React.ReactNode;
        className?: string;
        onClick?: () => void;
        whileHover?: unknown;
        whileTap?: unknown;
        "aria-label"?: string;
      }) => (
        <button className={className} onClick={onClick} aria-label={ariaLabel}>
          {children}
        </button>
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => {
      return <a href={href}>{children}</a>;
    },
  };
});

jest.mock("@/app/redux/hooks", () => {
  const useAppSelectorMock = jest.fn();

  return {
    useAppSelector: useAppSelectorMock,
    selectIsInMyList:
      (imdbID: string) =>
      (state: { myList?: { items?: { imdbID: string }[] } }) => {
        return (
          (
            state as { myList?: { items?: { imdbID: string }[] } }
          )?.myList?.items?.some((movie) => movie.imdbID === imdbID) || false
        );
      },
    useAppDispatch: jest.fn(() => jest.fn()),
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

jest.mock("lucide-react", () => ({
  Heart: () => <div data-testid="heart-icon"></div>,
  Play: () => <div data-testid="play-icon"></div>,
  Plus: () => <div data-testid="plus-icon"></div>,
  Check: () => <div data-testid="check-icon"></div>,
}));

describe("MovieCard", () => {
  const mockMovie: MovieDetails = {
    imdbID: "tt1234567",
    Title: "Test Movie",
    Year: "2023",
    Poster: "/test-poster.jpg",
    Type: "movie",
    Plot: "A test movie plot",
    Director: "Test Director",
    Actors: "Actor 1, Actor 2",
    Genre: "Drama",
    Runtime: "120 min",
    imdbRating: "8.5",
    Released: "2023-01-01",
  };

  const useAppSelectorMock =
    jest.requireMock("@/app/redux/hooks").useAppSelector;

  beforeEach(() => {
    useAppSelectorMock.mockClear();
    useAppSelectorMock.mockReturnValue(false);

    // @ts-expect-error - Mock implementation
    jest.spyOn(React, "useState").mockImplementation((initialState) => {
      if (initialState === false) {
        return [true, jest.fn()];
      }
      return [initialState, jest.fn()];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie details correctly", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);

    const headings = screen.getAllByRole("heading");
    const titleHeading = headings.find((h) => h.textContent === "Test Movie");
    expect(titleHeading).toBeInTheDocument();

    const yearText = screen.getAllByText("2023")[0];
    expect(yearText).toBeInTheDocument();

    expect(screen.getByAltText("Test Movie poster")).toBeInTheDocument();
  });

  it("renders fallback image when poster is not available", () => {
    const movieWithoutPoster = { ...mockMovie, Poster: "N/A" };
    renderWithProviders(<MovieCard movie={movieWithoutPoster} />);

    expect(screen.getByText("No image")).toBeInTheDocument();
  });

  it("contains a link to the movie details page", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movies/tt1234567");
  });

  it("shows My List badge when in my list", () => {
    useAppSelectorMock.mockReturnValue(true);

    renderWithProviders(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("My List")).toBeInTheDocument();
  });
});
