"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, easeInOut } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
}

export default function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?query=${encodeURIComponent(query)}&page=1`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const clearSearch = () => {
    setQuery("");
    const inputElement = document.querySelector("input");
    if (inputElement) inputElement.focus();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: easeInOut,
      }}
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto"
    >
      <motion.div
        className={cn(
          "flex items-center overflow-hidden rounded-md border transition-all duration-300",
          isFocused
            ? "border-[#e50914] shadow-lg shadow-[#e50914]/20 bg-black/90"
            : "border-[#333] bg-black/80 hover:bg-black/90"
        )}
        whileHover={{ scale: 1.01 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          ease: easeInOut,
        }}
      >
        <div className="flex-shrink-0 pl-3 pr-1 text-gray-400">
          <Search size={18} />
        </div>

        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Titles, people, genres..."
          className="w-full border-none rounded-none bg-transparent text-white placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base h-12"
          aria-label="Search for movies, TV shows, people"
          autoFocus
        />

        {query && (
          <Button
            type="button"
            onClick={clearSearch}
            className="flex-shrink-0 px-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </Button>
        )}

        <Button
          type="submit"
          className="bg-[#e50914] hover:bg-[#f40612] text-white h-full py-2 px-3 sm:px-5 rounded-none font-medium text-sm border-l border-[#333]"
          aria-label="Search"
          disabled={!query.trim()}
        >
          <span className="hidden xs:inline">Search</span>
          <Search className="h-4 w-4 xs:hidden" />
        </Button>
      </motion.div>

      {isFocused && (
        <div className="mt-2 text-xs text-gray-400 px-1">
          <p>
            Try searching for movies like &quot;Inception&quot;, &quot;The
            Godfather&quot;, or &quot;Avengers&quot;
          </p>
        </div>
      )}
    </motion.form>
  );
}
