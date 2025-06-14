import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, User } from "lucide-react"; // Heart icon removed
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  
  const getIconClasses = (path: string) => {
    const isActive = location.pathname === path;
    if (path === '/home') { // Home icon specific active color
      return isActive ? 'text-red-500' : 'text-gray-500 dark:text-gray-400';
    }
    return isActive ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'; // Standard active/inactive
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="flex items-center justify-around py-2 px-6">
          <Link to="/home">
            <Button variant="ghost" size="sm" className={`p-3 ${getIconClasses('/home')}`}>
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/discover">
            <Button variant="ghost" size="sm" className={`p-3 ${getIconClasses('/discover')}`}>
              <Search className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/studio">
            {/* Simplified Plus button styling */}
            <Button 
              variant="ghost" 
              size="sm" 
              className={`p-3 ${getIconClasses('/studio')} text-gray-500 dark:text-gray-400`}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </Link>
          {/* Heart button removed to match the design */}
          <Link to="/profile">
            <Button variant="ghost" size="sm" className={`p-3 ${getIconClasses('/profile')}`}>
              <User className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
