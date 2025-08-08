"use client";

import { useRouter } from "next/navigation";
import { motion, easeInOut } from "framer-motion";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

export default function Pagination({ currentPage, totalPages, query }: PaginationProps) {
  const router = useRouter();
  
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`/?query=${encodeURIComponent(query)}&page=${page}`);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const pageNumbers = [];
  const maxPagesToShow = 5;
  const mobilePagesToShow = 3;
  
  const isProbablyMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const visiblePages = isProbablyMobile ? mobilePagesToShow : maxPagesToShow;
  
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);
  
  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="mt-10 sm:mt-12 mb-8"
    >
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 20,
            ease: easeInOut
          }}
          className="bg-[#181818] rounded-md shadow-xl p-1 inline-block mx-auto border border-[#333]"
        >
          <ShadcnPagination>
            <PaginationContent className="flex flex-wrap justify-center">
              <PaginationItem>
                <Button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center min-w-9 h-9 px-3 py-1.5 rounded text-sm font-medium text-white transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#232323]'}`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
              
              {startPage > 1 && (
                <>
                  <PaginationItem className="hidden sm:block">
                    <Button
                      onClick={() => goToPage(1)}
                      className="flex items-center justify-center min-w-9 h-9 px-3 py-1.5 rounded text-sm font-medium text-white transition-colors hover:bg-[#232323]"
                    >
                      1
                    </Button>
                  </PaginationItem>
                  {startPage > 2 && (
                    <PaginationItem className="hidden sm:block">
                      <span className="flex items-center justify-center min-w-9 h-9 px-1 text-sm text-gray-400">•••</span>
                    </PaginationItem>
                  )}
                </>
              )}
              
              {pageNumbers.map(page => (
                <PaginationItem key={page}>
                  <Button
                    onClick={() => goToPage(page)}
                    className={`flex items-center justify-center min-w-9 h-9 px-3 py-1.5 rounded text-sm font-medium text-white transition-colors ${currentPage === page 
                      ? "bg-[#e50914] text-white hover:bg-[#f40612]"
                      : "hover:bg-[#232323]"
                    }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </Button>
                </PaginationItem>
              ))}
              
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <PaginationItem className="hidden sm:block">
                      <span className="flex items-center justify-center min-w-9 h-9 px-1 text-sm text-gray-400">•••</span>
                    </PaginationItem>
                  )}
                  <PaginationItem className="hidden sm:block">
                    <Button
                      onClick={() => goToPage(totalPages)}
                      className="flex items-center justify-center min-w-9 h-9 px-3 py-1.5 rounded text-sm font-medium text-white transition-colors hover:bg-[#232323]"
                    >
                      {totalPages}
                    </Button>
                  </PaginationItem>
                </>
              )}
              
              <PaginationItem>
                <Button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center min-w-9 h-9 px-3 py-1.5 rounded text-sm font-medium text-white transition-colors ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#232323]'}`}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </ShadcnPagination>
        </motion.div>
      </div>
      
      <div className="text-center mt-4 text-gray-400 text-sm">
        <span>Page {currentPage} of {totalPages}</span>
      </div>
    </motion.div>
  );
}