
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FeedbackForm = () => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState('');
  const [eventSelection, setEventSelection] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim() || !eventSelection) {
      toast({
        title: "Error",
        description: "Please complete all fields before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
    
    // Reset the form
    setFeedback('');
    setEventSelection('');
  };

  return (
    <div className="bg-campus-darkAccent/80 rounded-xl p-6 border border-white/10 backdrop-blur-md">
      <div className="flex items-center mb-4">
        <MessageSquare className="h-5 w-5 text-campus-pink mr-2" />
        <h2 className="text-xl font-semibold text-white">Event Feedback</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="event" className="block text-white/80 mb-2">
            Select Event
          </label>
          <Select value={eventSelection} onValueChange={setEventSelection}>
            <SelectTrigger className="bg-campus-dark border-white/20">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent className="bg-campus-darkAccent border-white/20">
              <SelectItem value="hackathon">Campus Hackathon 2023</SelectItem>
              <SelectItem value="career-fair">Spring Career Fair</SelectItem>
              <SelectItem value="concert">Annual Spring Concert</SelectItem>
              <SelectItem value="workshop">AI Workshop Series</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="feedback" className="block text-white/80 mb-2">
            Your Feedback
          </label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about this event..."
            className="min-h-[120px] bg-campus-dark border-white/20"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-campus-purple hover:bg-campus-purple/90"
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
