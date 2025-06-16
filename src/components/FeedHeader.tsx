import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, ListFilter } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XDoseLogo } from '@/components/XDoseLogo';
import type { SortOption } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FeedHeaderProps {
  sortOption: SortOption;
  onSortOptionChange: (value: SortOption) => void;
  showOnlyBookmarked: boolean;
  onShowOnlyBookmarkedChange: (checked: boolean) => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  sortOption,
  onSortOptionChange,
  showOnlyBookmarked,
  onShowOnlyBookmarkedChange,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  return (
    <header className="max-w-md mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <XDoseLogo size="md" />
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <User className="w-6 h-6" />
            </Button>
          </Link>
          {user && (
            <Button
              variant="outline"
              size="sm"
              className="text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <ListFilter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Select value={sortOption} onValueChange={(value) => onSortOptionChange(value as SortOption)}>
            <SelectTrigger className="w-[180px] bg-transparent border-gray-300 dark:border-gray-700 text-sm">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="bookmarks-filter"
            checked={showOnlyBookmarked}
            onCheckedChange={onShowOnlyBookmarkedChange}
            className="data-[state=checked]:bg-yellow-500"
          />
          <Label htmlFor="bookmarks-filter" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
            Bookmarks
          </Label>
        </div>
      </div>
    </header>
  );
};

export default FeedHeader;

