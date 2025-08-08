# Movie Search App

A responsive web application for searching movies using the OMDB API. Users can search for movies, view detailed information, and leave reviews.

## Features

- Search for movies by title
- View paginated search results
- See detailed movie information including title, director, actors, release date, runtime, and plot
- Add and view reviews for movies (persisted in browser localStorage)
- Responsive design for all screen sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm (recommended) or npm
- OMDB API Key (get one at http://www.omdbapi.com/apikey.aspx)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-search.git
cd movie-search
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Create a `.env.local` file in the root directory with your OMDB API key:

```
OMDB_API=your_api_key_here
```

4. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to use the application.

## Technologies Used

- Next.js 14
- React with TypeScript
- Tailwind CSS for styling
- SWR for data fetching
- OMDB API for movie data

## Project Structure

- `src/app/components/` - UI components
- `src/app/hooks/` - Custom React hooks
- `src/app/lib/` - Utility functions and API integration
- `src/app/types/` - TypeScript type definitions

## Future Enhancements

See the NOTES.md file for planned future enhancements and the project development process.
