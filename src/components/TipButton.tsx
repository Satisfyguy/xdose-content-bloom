
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

interface TipButtonProps {
  creatorName: string;
}

const TipButton = ({ creatorName }: TipButtonProps) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const predefinedAmounts = [5, 10, 25, 50];

  const handleSendTip = () => {
    // Handle tip sending logic here
    console.log(`Sending $${amount} tip to ${creatorName} with message: ${message}`);
    setIsOpen(false);
    setAmount('');
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600"
        >
          <Heart className="w-4 h-4 mr-1" />
          Tip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border-gray-200/20">
        <DialogHeader>
          <DialogTitle>Send a tip to {creatorName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <div className="flex space-x-2 mt-2">
              {predefinedAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  className={amount === preset.toString() ? 'bg-purple-100 border-purple-300' : ''}
                >
                  ${preset}
                </Button>
              ))}
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="Custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              placeholder="Say something nice..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button 
            onClick={handleSendTip}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Send ${amount || '0'} Tip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipButton;
