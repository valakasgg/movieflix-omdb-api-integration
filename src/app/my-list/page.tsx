'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/app/redux/hooks";
import MovieCard from "@/app/components/movie/MovieCard";
import BackButton from "@/app/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MyListPage() {
  const myList = useAppSelector(state => state.myList.items);
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.main 
      className="min-h-screen bg-[#141414] text-white p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton href="/" />

      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        My List
      </motion.h1>

      <AnimatePresence>
        {mounted && myList.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.div 
              className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Your list is empty
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-center max-w-md mb-6 sm:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Browse movies and click the "My List" button to save them for later.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button asChild className="bg-[#e50914] hover:bg-[#e50914]/90 text-white">
                <Link href="/">Browse Movies</Link>
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {mounted && myList.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
