'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector, selectMyListCount } from "@/app/redux/hooks";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const myListCount = useAppSelector(selectMyListCount);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 py-3 px-4 sm:px-6 md:px-8 transition-all duration-300 ${
        scrolled ? 'bg-[#141414] shadow-md' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <span className="text-[#e50914] font-bold text-2xl sm:text-3xl tracking-tighter">
              MOVIEFLIX
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium ${pathname === '/' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'} transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/my-list" 
              className={`text-sm font-medium ${pathname === '/my-list' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'} transition-colors`}
            >
              <span className="relative">
                My List
                {mounted && myListCount > 0 && (
                  <span className="absolute -top-1 -right-6 w-5 h-5 bg-[#e50914] rounded-full text-[10px] flex items-center justify-center">
                    {myListCount}
                  </span>
                )}
              </span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <Button 
            onClick={() => router.push('/')}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </Button>
          
          <motion.div 
            className="h-8 w-8 bg-[#e50914] rounded-sm overflow-hidden flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold">N</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
