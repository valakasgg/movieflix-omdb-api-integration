"use client";

import MovieCard from "./MovieCard";
import Pagination from "../ui/Pagination";
import { SearchResponse } from "../../types";
import { motion, easeInOut } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface MovieListProps {
  movies: SearchResponse;
  query: string;
  currentPage: number;
}

export default function MovieList({
  movies,
  query,
  currentPage,
}: MovieListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        ease: easeInOut,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeInOut,
      },
    },
  };

  if (!movies.Search || movies.Search.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Card className="bg-[#181818] border-[#333]">
          <CardContent className="flex flex-col items-center justify-center py-16 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 mb-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <p className="text-xl text-gray-400 text-center">
              No movies found for &quot;{query}&quot;
            </p>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Try adjusting your search or checking for typos
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const totalPages = Math.ceil(parseInt(movies.totalResults) / 10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2"
      >
        <h2 className="text-xl sm:text-2xl font-medium text-white">
          <span className="text-[#e50914]">{movies.totalResults}</span> results
          for &quot;{query}&quot;
        </h2>
      </motion.div>

      <div className="space-y-10">
        <section>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl font-medium mb-4 text-white flex items-center"
          >
            <span className="relative before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-[#e50914] pb-0.5">
              Top Matches
            </span>
            <span className="ml-2 text-gray-400 text-sm font-normal">
              Based on your search
            </span>
          </motion.h3>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 xs:gap-3 md:gap-4 relative"
          >
            {movies.Search.map((movie, index) => (
              <motion.div key={`${movie.imdbID}-${index}`} variants={item}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            query={query}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
