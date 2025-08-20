"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import SearchBar from "./components/search/SearchBar";
import MovieList from "./components/movie/MovieList";
import { useMovieSearch } from "./hooks/useMovieSearch";
import Image from "next/image";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-400">Loading...</div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

import { Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const pageParam = searchParams.get("page") || "1";
  const page = Number(pageParam);

  const [searchConfig, setSearchConfig] = useState(
    query ? { s: query, page } : null
  );

  useEffect(() => {
    if (query) {
      setSearchConfig({ s: query, page });
    }
  }, [query, page]);

  const { movies, isLoading, isError, error } = useMovieSearch(searchConfig);

  return (
    <motion.main
      className="min-h-screen bg-[#141414] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
    >
      <div className="relative pb-6 sm:pb-10">
        <div className="absolute top-0 left-0 w-full h-[500px] sm:h-[600px] overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/20 to-[#141414] opacity-60">
            {!query && (
              <div className="absolute inset-0 z-10 mix-blend-overlay opacity-30">
                <Image
                  src="/netflix-bg.jpg"
                  alt="Movie background"
                  fill
                  priority
                  quality={80}
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/70 via-[#141414]/50 to-[#141414]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/50 to-[#141414]/50"></div>
        </div>

        <div className="relative z-10 px-4 md:px-8 pt-16 sm:pt-24 md:pt-32 pb-20 sm:pb-28 md:pb-36 max-w-7xl mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
          >
            Find Your Perfect Movie
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-center text-gray-400 mb-8 sm:mb-10 md:mb-12"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easeInOut }}
          >
            Search through thousands of titles in our extensive collection
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: easeInOut }}
            className="max-w-2xl mx-auto"
          >
            <SearchBar initialQuery={query} />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 sm:-mt-16 md:-mt-20 relative z-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: easeInOut }}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              className="flex flex-col justify-center items-center py-12 sm:py-16 md:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#e50914] border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              ></motion.div>
              <p className="mt-4 text-gray-400">Searching for titles...</p>
            </motion.div>
          )}

          {isError && (
            <motion.div
              key="error"
              className="text-center p-8 sm:p-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-lg mx-auto bg-[#181818] border border-[#333] rounded-lg p-6 sm:p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e50914]/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#e50914]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">
                  Search Error
                </h3>
                <p className="text-gray-400 mb-4">
                  {error?.message || "Failed to load movies"}
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-[#333] hover:bg-[#444] text-white px-4 py-2 text-sm rounded"
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}

          {!isLoading && query && movies && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MovieList movies={movies} query={query} currentPage={page} />
            </motion.div>
          )}

          {!isLoading && !query && (
            <motion.div
              key="empty"
              className="text-center mt-8 sm:mt-10 md:mt-12 py-12 sm:py-16 md:py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="max-w-xl mx-auto"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div className="w-20 h-20 mx-auto mb-6 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium mb-2">Ready to explore?</h3>
                <p className="text-gray-400 text-lg mb-6">
                  Search for your favorite movies by title, actor, or genre
                </p>
                <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-400">
                  <span className="px-3 py-1 rounded-full border border-[#333] hover:border-gray-400 transition-colors">
                    The Godfather
                  </span>
                  <span className="px-3 py-1 rounded-full border border-[#333] hover:border-gray-400 transition-colors">
                    Inception
                  </span>
                  <span className="px-3 py-1 rounded-full border border-[#333] hover:border-gray-400 transition-colors">
                    Star Wars
                  </span>
                  <span className="px-3 py-1 rounded-full border border-[#333] hover:border-gray-400 transition-colors">
                    Avengers
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.main>
  );
}
