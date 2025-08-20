import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
import { MovieDetails as MovieDetailsType } from "../../types";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useAppDispatch,
  useAppSelector,
  selectIsInMyList,
} from "@/app/redux/hooks";
import { addToList, removeFromList } from "@/app/redux/slices/myListSlice";
import { useCallback, useMemo } from "react";
import { InfoIcon, Play, Plus, Check, ThumbsUp, Share2 } from "lucide-react";

export default function MovieDetails({ movie }: { movie: MovieDetailsType }) {
  const dispatch = useAppDispatch();
  const selectIsMovieInMyList = useMemo(
    () => selectIsInMyList(movie.imdbID),
    [movie.imdbID]
  );
  const isInMyList = useAppSelector(selectIsMovieInMyList);

  const toggleMyList = useCallback(() => {
    if (isInMyList) {
      dispatch(removeFromList(movie.imdbID));
    } else {
      dispatch(
        addToList({
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
          Type: movie.Type,
          Plot: movie.Plot,
          Director: movie.Director,
          Actors: movie.Actors,
          Released: movie.Released,
          Runtime: movie.Runtime,
          Genre: movie.Genre,
          imdbRating: movie.imdbRating,
          Rated: movie.Rated,
          Awards: movie.Awards,
        })
      );
    }
  }, [dispatch, movie, isInMyList]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: easeInOut,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative text-white"
    >
      <div className="relative w-full h-full pt-16 md:pt-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-[70vh] md:h-[85vh]">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <div className="relative w-full h-full">
              <Image
                src={movie.Poster}
                alt={`${movie.Title} backdrop`}
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/90 via-transparent to-[#141414]/90"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/70 via-transparent to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#181818] to-[#141414]"></div>
          )}
        </div>

        <div className="relative h-full flex flex-col justify-center mt-8 md:mt-[15vh] p-4 sm:p-6 md:p-12 max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-12"
            variants={stagger}
          >
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="hidden md:block"
            >
              <Card className="bg-[#181818] p-0 shrink-0 w-48 h-72 md:w-72 md:h-[420px] overflow-hidden shadow-2xl border-0">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <Image
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                    width={300}
                    height={450}
                    className="object-cover w-full h-full"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#232323]">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </Card>
            </motion.div>

            <motion.div className="flex-1 max-w-3xl" variants={stagger}>
              <motion.h1
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white leading-tight"
                variants={fadeIn}
              >
                {movie.Title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-4 sm:mb-6"
                variants={fadeIn}
              >
                <span className="text-[#46d369] font-medium">
                  {movie.imdbRating !== "N/A"
                    ? `${movie.imdbRating}/10 Match`
                    : "No Rating"}
                </span>
                <span className="text-gray-400 mx-1">•</span>
                <span className="text-white">{movie.Year}</span>
                <span className="text-gray-400 mx-1">•</span>
                <span className="text-white">{movie.Runtime}</span>

                {movie.Rated !== "N/A" && (
                  <>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="border border-gray-400 text-gray-400 text-xs px-1 rounded">
                      {movie.Rated}
                    </span>
                  </>
                )}

                {movie.Type !== "N/A" && (
                  <>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="border border-gray-400 text-gray-400 text-xs px-1 rounded">
                      {movie.Type.toUpperCase()}
                    </span>
                  </>
                )}
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
                variants={fadeIn}
              >
                <Button className="bg-white hover:bg-white/90 text-black flex items-center gap-2 px-5 py-1.5 h-auto text-sm md:text-base">
                  <Play size={16} fill="currentColor" />
                  <span>Play</span>
                </Button>

                <Button
                  className="bg-[#333333] hover:bg-[#444444] text-white flex items-center gap-2 px-5 py-1.5 h-auto text-sm md:text-base"
                  onClick={toggleMyList}
                >
                  {isInMyList ? <Check size={16} /> : <Plus size={16} />}
                  <span>{isInMyList ? "My List" : "My List"}</span>
                </Button>

                <Button
                  className="bg-[#232323] hover:bg-[#333333] text-white rounded-full w-9 h-9 p-0"
                  aria-label="Like"
                >
                  <ThumbsUp size={16} />
                </Button>

                <Button
                  className="bg-[#232323] hover:bg-[#333333] text-white rounded-full w-9 h-9 p-0"
                  aria-label="Share"
                >
                  <Share2 size={16} />
                </Button>
              </motion.div>

              <motion.p
                className="text-white mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed"
                variants={fadeIn}
              >
                {movie.Plot}
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm sm:text-base"
                variants={stagger}
              >
                <motion.div variants={fadeIn} className="flex mb-1">
                  <span className="text-gray-400 w-24 flex-shrink-0">
                    Director:
                  </span>
                  <span className="text-white">{movie.Director}</span>
                </motion.div>

                <motion.div variants={fadeIn} className="flex mb-1">
                  <span className="text-gray-400 w-24 flex-shrink-0">
                    Stars:
                  </span>
                  <span className="text-white">{movie.Actors}</span>
                </motion.div>

                <motion.div variants={fadeIn} className="flex mb-1">
                  <span className="text-gray-400 w-24 flex-shrink-0">
                    Genre:
                  </span>
                  <span className="text-white">{movie.Genre}</span>
                </motion.div>

                <motion.div variants={fadeIn} className="flex mb-1">
                  <span className="text-gray-400 w-24 flex-shrink-0">
                    Released:
                  </span>
                  <span className="text-white">{movie.Released}</span>
                </motion.div>

                {movie.Awards !== "N/A" && (
                  <motion.div
                    variants={fadeIn}
                    className="flex mb-1 col-span-1 md:col-span-2"
                  >
                    <span className="text-gray-400 w-24 flex-shrink-0">
                      Awards:
                    </span>
                    <span className="text-[#46d369]">{movie.Awards}</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="bg-[#181818] border-t border-[#333] py-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <InfoIcon size={20} className="text-gray-400" />
              <span className="text-lg font-medium">
                About <span className="text-white">{movie.Title}</span>
              </span>
            </div>

            {movie.Rated !== "N/A" && (
              <div className="md:ml-auto flex items-center gap-3">
                <div className="border border-gray-400 px-1.5 py-0.5 text-xs text-gray-400">
                  {movie.Rated}
                </div>
                <span className="text-xs text-gray-400">
                  Recommended for ages{" "}
                  {movie.Rated === "G"
                    ? "All ages"
                    : movie.Rated === "PG"
                    ? "8+"
                    : movie.Rated === "PG-13"
                    ? "13+"
                    : movie.Rated === "R"
                    ? "17+"
                    : movie.Rated === "NC-17"
                    ? "18+"
                    : "Unknown"}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
