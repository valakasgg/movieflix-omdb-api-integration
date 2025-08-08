"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Review } from "../../types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/app/redux/hooks";
import { addReview } from "@/app/redux/slices/reviewsSlice";
import { AlertCircle, CheckCircle, Star } from "lucide-react";

interface ReviewFormProps {
  movieId: string;
  onSubmitReview?: (review: Review) => void;
}

// Using memo to prevent unnecessary re-renders
const ReviewForm = memo(function ReviewForm({ movieId, onSubmitReview }: ReviewFormProps) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 10);
      const uniqueId = `review-${movieId.substring(0, 5)}-${timestamp}-${randomStr}`;
      
      const review: Review = {
        id: uniqueId,
        movieId,
        rating,
        comment,
        author,
        createdAt: timestamp
      };
      
      dispatch(addReview(review));
      
      if (onSubmitReview) {
        onSubmitReview(review);
      }
      
      setAuthor("");
      setRating(5);
      setComment("");
      setMessage("Your review has been submitted successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      setMessage("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeInOut }}
    >
      <Card className="border-[#333] bg-[#181818] shadow-xl">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-white text-lg font-medium mb-4">Write a Review</h3>
          
          <AnimatePresence>
            {message && (
              <motion.div 
                className={`mb-4 p-3 sm:p-4 rounded-md text-sm flex items-start gap-2 ${
                  message.includes("Failed") 
                    ? "bg-red-900/40 text-red-200 border border-red-800/50" 
                    : "bg-green-900/40 text-green-200 border border-green-800/50"
                }`}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.includes("Failed") ? (
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                )}
                <span>{message}</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="mb-4 sm:mb-5 space-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="author" className="block font-medium text-gray-400 text-sm">
                Your Name
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#232323] text-white border-[#333] focus-visible:ring-[#e50914] focus-visible:border-[#e50914] text-sm"
                required
              />
            </motion.div>
            
            <motion.div 
              className="mb-4 sm:mb-5 space-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="rating" className="block font-medium text-gray-400 text-sm">
                Rating
              </Label>
              <div className="flex items-center gap-3">
                <div className="w-full">
                  <Select
                    value={rating.toString()}
                    onValueChange={(value) => setRating(parseInt(value))}
                  >
                    <SelectTrigger className="w-full bg-[#232323] text-white border-[#333] focus:border-[#e50914] focus-visible:ring-[#e50914] text-sm">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#232323] text-white border-[#333]">
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} {i === 9 ? "(Best)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <motion.div 
                  className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 bg-[#e50914] rounded-full text-white font-bold text-sm sm:text-base"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                  key={rating}
                >
                  <div className="flex items-center">
                    <span>{rating}</span>
                    <Star className="w-3 h-3 ml-0.5 fill-current" />
                  </div>
                </motion.div>
              </div>
              
              <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-5 sm:mb-6 space-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="comment" className="block font-medium text-gray-400 text-sm">
                Your Review
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#232323] text-white border-[#333] focus-visible:ring-[#e50914] focus-visible:border-[#e50914] text-sm"
                rows={4}
                required
                placeholder="Share your thoughts about this title..."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#e50914] hover:bg-[#f40612] text-white px-6 text-sm font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    Submitting...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </Button>
              
              <p className="text-xs text-gray-400">
                All reviews are moderated
              </p>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default ReviewForm;