
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoDetailsFormProps {
  title: string;
  onTitleChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  tags: string;
  onTagsChange: (value: string) => void;
  tier: string;
  onTierChange: (value: string) => void;
}

const VideoDetailsForm: React.FC<VideoDetailsFormProps> = ({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  tags,
  onTagsChange,
  tier,
  onTierChange,
}) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/20">
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="Give your video a catchy title..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your video..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="mt-2"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="Separate tags with commas (e.g., music, dance, fun)"
            value={tags}
            onChange={(e) => onTagsChange(e.target.value)}
            className="mt-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use tags to help people discover your content
          </p>
        </div>
        
        <div>
          <Label htmlFor="tier">Subscription Tier</Label>
          <Select value={tier} onValueChange={onTierChange}>
            <SelectTrigger id="tier" className="mt-2">
              <SelectValue placeholder="Select a tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="fan-access">Fan Access</SelectItem>
              <SelectItem value="supporter-plus">Supporter Plus</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Choose who can view this video.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoDetailsForm;
