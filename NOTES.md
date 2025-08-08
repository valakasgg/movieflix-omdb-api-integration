# Movie Search - Planning Notes

## Plan of Attack (3-4 hours total)

### Task Breakdown with Time Estimates

| Task                                        | Priority |
| ------------------------------------------- | -------- |
| Project setup (Nextjs + React + TypeScript) | High     |
| Tailwind CSS setup & basic styling          | High     |
| OMDb API integration                        | High     |
| Search component with basic UI              | High     |
| Results list with pagination                | High     |
| Movie details page                          | High     |
| Basic routing setup                         | High     |
| Reviews functionality (localStorage)        | Medium   |
| Mobile-responsive styling refinement        | Medium   |
| Loading states & error handling             | Medium   |

## Technical Decisions Made

### Framework Choice: React with TypeScript

- Strong TypeScript support
- Familiar ecosystem

### Package Manager: pnpm

- Faster installs and disk efficiency
- Better dependency management

### Styling: Tailwind CSS

- Rapid prototyping with utility classes
- Built-in mobile-first responsive design
- Consistent design system out of the box

### State Management: React Hooks + SWR

- Lightweight for this scope
- SWR for data fetching, caching, and revalidation
- Local state with useState for form handling

### API Strategy: Custom hooks for search and details

- Encapsulates API logic
- Easy to test and reuse

### API Limitations and Workarounds

- OMDB Search API (`?s=`) doesn't return director and actor information in search results
- Requirement states "View a list of paginated search results with movie titles, directors, and actors"
- **Workaround**: To fully meet this requirement, we would need to make additional API calls for each search result to get complete details
- Due to API rate limits and performance considerations, we show title and year in search results, with full details on the movie page
- A production solution might involve caching or backend middleware to enrich search results with full details

## Component Structure Plan

```
src/
├── components/
│   ├── SearchBar.tsx
│   ├── MovieList.tsx
│   ├── MovieCard.tsx
│   ├── MovieDetails.tsx
│   └── ReviewForm.tsx
├── hooks/
│   └── useMovies.ts
├── services/
│   └── omdbApi.ts
├── types/
│   └── movie.ts
└── context/
    └── MovieContext.tsx
```

## State Management Approach

- Global State: Search results, current movie, loading states
- Local State: Form inputs, reviews (localStorage)
- Data Flow: Context Provider → Components → Custom Hooks → API Service

## Tailwind Design Strategy

- Mobile-first: Use sm:, md:, lg: breakpoints
- Component patterns: Card layouts, grid systems, form styling
- Color scheme: Neutral grays with blue accents for actions
- Typography: Built-in text sizing and spacing

## Future Extensions

### User Authentication:

- Add JWT token management
- Protected routes for reviews
- User-specific review history

### Favorite Movies:

- Add favorites context
- Persist to backend/localStorage
- Filter/sort favorites

## Security Considerations

- API key stored in environment variables
- Input sanitization for search queries
- XSS prevention in review content

## Performance Optimizations

- Debounced search input
- Memoized components with React.memo
- Lazy loading for movie details
- Pagination to limit API calls
- Tailwind's built-in CSS purging
