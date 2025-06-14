
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
import AnimatedHeaderText from "@/components/AnimatedHeaderText";
import type { SortOption } from '@/types';

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
  return (
    <header className="max-w-md mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <AnimatedHeaderText text="Feed" />
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
            <User className="w-6 h-6" />
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <ListFilter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Select value={sortOption} onValueChange={(value) => onSortOptionChange(value as SortOption)}>
            <SelectTrigger className="w-[180px] bg-transparent border-gray-300 dark:border-gray-700 text-sm">
              <SelectValue placeholder="Trier par..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus Récent</SelectItem>
              <SelectItem value="popular">Plus Populaire</SelectItem>
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
            Favoris
          </Label>
        </div>
      </div>
    </header>
  );
};

export default FeedHeader;
