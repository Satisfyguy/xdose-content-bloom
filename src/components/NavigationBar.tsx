
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, Heart, User } from "lucide-react";

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="flex items-center justify-around py-2 px-6">
          <Button variant="ghost" size="sm" className="p-3">
            <Home className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="p-3">
            <Search className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600"
          >
            <Plus className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="p-3">
            <Heart className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="p-3">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
