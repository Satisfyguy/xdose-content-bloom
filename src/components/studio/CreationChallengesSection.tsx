
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Film, Sparkles, Lightbulb } from 'lucide-react';
import CreationChallengeCard from './CreationChallengeCard';

// Define CreationChallenge interface here or move to a global types file if used elsewhere
export interface CreationChallenge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  participants?: number;
  deadline?: string;
}

interface CreationChallengesSectionProps {
  challenges: CreationChallenge[];
}

const CreationChallengesSection: React.FC<CreationChallengesSectionProps> = ({ challenges }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/20">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-semibold">Creation Challenges</h2>
        </div>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <CreationChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreationChallengesSection;
