
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  benefits: string[];
  isRecommended?: boolean;
}

interface SubscriptionPlanProps {
  plan: Plan;
}

const SubscriptionPlan = ({ plan }: SubscriptionPlanProps) => {
  const isRecommended = plan.isRecommended || plan.name === "Supporter Plus"; // Adjusted to match new recommended tier name

  return (
    <Card className={`relative w-full ${isRecommended ? 'border-purple-300 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30' : 'bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm'}`}>
      {isRecommended && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs">
          Recommended
        </Badge>
      )}
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <h3 className="font-semibold text-xl mb-1">{plan.name}</h3>
          <div className="text-3xl font-bold mb-1">{plan.price}</div>
          {plan.price.toLowerCase() !== "free" && <div className="text-sm text-neutral-600 dark:text-neutral-400">/month</div>}
        </div>
        
        <ul className="space-y-2 mb-6">
          {plan.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full font-semibold ${isRecommended ? 
            'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' : 
            'bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300 text-white'
          }`}
        >
          Select {plan.name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlan;
