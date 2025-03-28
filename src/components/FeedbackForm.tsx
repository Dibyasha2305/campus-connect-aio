
import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

const FeedbackForm = () => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState('');
  const [eventSelection, setEventSelection] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim() || !eventSelection) {
      toast({
        title: "Error",
        description: "Please select an event and provide feedback.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! Your input helps us improve.",
    });
    
    // Reset the form
    setFeedback('');
    setEventSelection('');
    setRating(null);
    setEmail('');
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
              <SelectItem value="basketball">Intramural Basketball Tournament</SelectItem>
              <SelectItem value="tech-panel">Women in Tech Panel Discussion</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-white/80 mb-2">
            Your Email (optional)
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-campus-dark border-white/20"
          />
        </div>
        
        <div>
          <label className="block text-white/80 mb-2">
            Rate Your Experience
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    rating && star <= rating 
                      ? 'text-campus-pink fill-campus-pink' 
                      : 'text-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="feedback" className="block text-white/80 mb-2">
            Your Feedback
          </label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about this event... What did you like? What could be improved?"
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
