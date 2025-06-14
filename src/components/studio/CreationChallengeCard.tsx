
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb } from 'lucide-react';
import type { CreationChallenge } from './CreationChallengesSection'; // Import type from parent

interface CreationChallengeCardProps {
  challenge: CreationChallenge;
}

const CreationChallengeCard: React.FC<CreationChallengeCardProps> = ({ challenge }) => {
  const ChallengeIcon = challenge.icon;
  return (
    <Card className="bg-slate-50 dark:bg-slate-800/30 border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex-shrink-0">
            <ChallengeIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base">{challenge.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2">{challenge.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
              {challenge.participants && <span><Sparkles className="inline w-3 h-3 mr-1" /> {challenge.participants} participants</span>}
              {challenge.deadline && <span><Lightbulb className="inline w-3 h-3 mr-1" /> Deadline: {challenge.deadline}</span>}
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="mt-2 sm:mt-0 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 dark:border-yellow-400 dark:text-yellow-300 dark:hover:bg-yellow-900/50 dark:hover:text-yellow-200 self-start sm:self-center"
          >
            Participate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreationChallengeCard;
