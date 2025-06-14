
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="flex items-center justify-around py-2 px-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className={`p-3 ${isActive('/') ? 'text-purple-600' : ''}`}>
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/discover">
            <Button variant="ghost" size="sm" className={`p-3 ${isActive('/discover') ? 'text-purple-600' : ''}`}>
              <Search className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/studio">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="p-3">
            <Heart className="w-6 h-6" />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className={`p-3 ${isActive('/profile') ? 'text-purple-600' : ''}`}>
              <User className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
