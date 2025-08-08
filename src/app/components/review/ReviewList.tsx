"use client";

import { motion, easeInOut } from "framer-motion";
import { Review } from "../../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/app/redux/hooks";
import { memo } from "react";
import { ThumbsUp, MessageSquare, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";


interface ReviewListProps {
  reviews?: Review[];
  movieId?: string;
}

// Using memo to prevent unnecessary re-renders
const ReviewList = memo(function ReviewList({ reviews: propReviews, movieId }: ReviewListProps) {
  
  
  const allReduxReviews = useAppSelector(state => state.reviews.items);
  
  let reviews = propReviews || (movieId 
    ? allReduxReviews.filter(review => review.movieId === movieId)
    : allReduxReviews);
    
  reviews = [...reviews].sort((a, b) => b.createdAt - a.createdAt);

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="bg-[#181818] border-[#333]">
        <CardContent className="p-6">
          <motion.div 
            className="text-gray-400 text-center flex flex-col items-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: easeInOut }}
          >
            <MessageSquare size={32} className="mb-3 opacity-60" />
            <p>No reviews yet. Be the first to share your thoughts!</p>
          </motion.div>
        </CardContent>
      </Card>
    );
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: easeInOut
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeInOut
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Card className="bg-[#181818] border-[#333]">
        <CardContent className="p-6">
          <div className="space-y-8">
            {reviews.map((review, index) => (
              <motion.div 
                key={`${review.id}-${index}`}
                variants={item}
                custom={index}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 rounded-full bg-[#d30813] flex items-center justify-center text-white font-bold">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold text-white">{review.author}</h4>
                      <div className="ml-2 flex items-center">
                        <Badge className="bg-[#e50914] hover:bg-[#f40612] text-white font-semibold h-5 px-2 text-xs">
                          {review.rating}/10
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-400 ml-auto">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : 'Loading...'}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mt-2 text-sm">
                      {review.comment}
                    </p>
                    
                    <div className="mt-3 flex items-center text-gray-400 text-xs">
                      <Button className="flex items-center gap-1 hover:text-white transition-colors">
                        <ThumbsUp size={14} />
                        <span>Helpful</span>
                      </Button>
                      
                      <span className="mx-3 text-[#444]">|</span>
                      
                      <Button className="flex items-center gap-1 hover:text-white transition-colors">
                        <Flag size={14} />
                        <span>Report</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {index < reviews.length - 1 && (
                  <Separator className="mt-8 bg-[#333]" />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default ReviewList;