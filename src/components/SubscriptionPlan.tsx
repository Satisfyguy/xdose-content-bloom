
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: number;
  benefits: string[];
}

interface SubscriptionPlanProps {
  plan: Plan;
}

const SubscriptionPlan = ({ plan }: SubscriptionPlanProps) => {
  const isRecommended = plan.name === "Premium";

  return (
    <Card className={`relative ${isRecommended ? 'border-purple-300 bg-gradient-to-br from-purple-50/50 to-pink-50/50' : 'bg-white/80 backdrop-blur-sm'}`}>
      {isRecommended && (
        <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Most Popular
        </Badge>
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{plan.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold">${plan.price}</div>
            <div className="text-sm text-gray-600">/month</div>
          </div>
        </div>
        
        <ul className="space-y-2 mb-4">
          {plan.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${isRecommended ? 
            'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 
            'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
          }`}
        >
          Subscribe to {plan.name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlan;
