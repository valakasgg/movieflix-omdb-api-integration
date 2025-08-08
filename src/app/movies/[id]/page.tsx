'use client';

import { useParams } from 'next/navigation';
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import MovieDetails from "../../components/movie/MovieDetails";
import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";
import BackButton from "../../components/ui/BackButton";
import { useMovieDetails } from "../../hooks/useMovieSearch";
import { useAppDispatch, useAppSelector, selectReviewsByMovieId } from "@/app/redux/hooks";
import { addReview } from "@/app/redux/slices/reviewsSlice";
import { Review } from "../../types";
import { useMemo } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function MoviePage() {
  const params = useParams();
  const id = params.id as string;
  
  const { movie, isLoading, isError, error } = useMovieDetails(id);
  const dispatch = useAppDispatch();
  
  const selectReviews = useMemo(() => selectReviewsByMovieId(id), [id]);
  const reviews = useAppSelector(selectReviews);

  const handleReviewSubmit = (review: Review) => {
    dispatch(addReview(review));
  };

  return (
    <motion.main 
      className="min-h-screen bg-[#141414] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
    >
      <BackButton href="/" position="absolute" />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="flex flex-col justify-center items-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="loading"
          >
            <motion.div 
              className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#e50914] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            ></motion.div>
            <p className="mt-4 text-gray-400">Loading movie details...</p>
          </motion.div>
        )}
        
        {isError && (
          <motion.div 
            className="flex justify-center items-center h-screen px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            key="error"
          >
            <motion.div 
              className="bg-[#181818] p-6 sm:p-8 md:p-10 rounded-lg max-w-lg mx-auto text-center border border-[#333] shadow-xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div 
                className="text-[#e50914] text-4xl mb-4 mx-auto w-16 h-16"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <AlertTriangle size={64} />
              </motion.div>
              <motion.h2 
                className="text-2xl font-medium mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Error Loading Movie
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-base sm:text-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {error?.message || "Failed to load movie details"}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  href="/" 
                  className="bg-[#e50914] hover:bg-[#f40612] text-white px-6 py-2 inline-block text-center rounded"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to Home
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        
        {!isLoading && movie && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
          >
            <MovieDetails movie={movie} />
            
            <motion.div 
              className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: easeInOut }}
            >
              <motion.h2 
                className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, ease: easeInOut }}
              >
                Reviews & Ratings
              </motion.h2>
              
              <motion.div
                className="mb-8 sm:mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, ease: easeInOut }}
              >
                <ReviewList movieId={id} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, ease: easeInOut }}
              >
                <ReviewForm movieId={id} onSubmitReview={handleReviewSubmit} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}