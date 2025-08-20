"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "../../types";
import { motion, easeInOut } from "framer-motion";
import { useAppSelector, selectIsInMyList } from "@/app/redux/hooks";
import { useMemo, useState } from "react";
import { Heart, Play, Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MovieCard({ movie }: { movie: Movie }) {
  const selectIsMovieInMyList = useMemo(
    () => selectIsInMyList(movie.imdbID),
    [movie.imdbID]
  );
  const isInMyList = useAppSelector(selectIsMovieInMyList);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: easeInOut,
      }}
      whileHover={{
        scale: 1.05,
        zIndex: 20,
        transition: {
          duration: 0.3,
          ease: easeInOut,
        },
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative z-10"
    >
      <Link href={`/movies/${movie.imdbID}`} className="block">
        <Card className="overflow-hidden border-0 shadow-lg bg-[#181818] rounded-md relative transition-all duration-300">
          <div className="relative aspect-[2/3] w-full">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <Image
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-all duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#232323]">
                <span className="text-gray-400 text-sm font-medium">
                  No image
                </span>
              </div>
            )}

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            {isInMyList && (
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-[#e50914] text-white text-xs font-medium px-2 py-1 rounded-sm">
                  My List
                </Badge>
              </div>
            )}
          </div>

          <div
            className={`absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-2 mb-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-black"
                aria-label="Play"
              >
                <Play size={16} fill="currentColor" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-[#2a2a2a] border border-gray-400"
                aria-label={
                  isInMyList ? "Remove from My List" : "Add to My List"
                }
              >
                {isInMyList ? <Check size={16} /> : <Plus size={16} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-[#2a2a2a] border border-gray-400 ml-auto"
                aria-label="Like"
              >
                <Heart size={16} />
              </motion.button>
            </div>

            <div className="space-y-1">
              <h2 className="font-medium text-sm text-white line-clamp-1">
                {movie.Title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[#46d369] text-xs font-medium">
                  {movie.Year}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs bg-[#232323] text-gray-400 border-[#404040] h-5 px-1.5"
                >
                  {movie.Type}
                </Badge>
              </div>
            </div>
          </div>

          <CardContent
            className={`p-2 sm:p-3 bg-[#181818] transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <h2 className="font-medium text-xs sm:text-sm text-white truncate">
              {movie.Title}
            </h2>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-400 text-xs">{movie.Year}</p>
              <Badge
                variant="outline"
                className="text-xs bg-[#232323] text-gray-400 border-[#404040] h-5 px-1.5"
              >
                {movie.Type}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
