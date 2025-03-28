
import React from 'react';
import { Calendar, Clock, MapPin, Users, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  image: string;
}

const EventCard = ({ id, title, date, time, location, attendees, category, image }: EventCardProps) => {
  const { toast } = useToast();

  const handleRSVP = () => {
    toast({
      title: "RSVP Confirmed!",
      description: `You've successfully RSVP'd to "${title}"`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Event Saved",
      description: `"${title}" has been added to your saved events.`,
    });
  };

  const handleVote = (type: 'up' | 'down') => {
    toast({
      title: type === 'up' ? "Upvoted!" : "Downvoted",
      description: `You've ${type === 'up' ? 'upvoted' : 'downvoted'} "${title}"`,
    });
  };

  return (
    <Card className="campus-card group overflow-hidden animate-fade-in campus-hover">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <Badge
            className={`
              ${category === 'Tech' ? 'bg-campus-blue' : ''}
              ${category === 'Sports' ? 'bg-campus-teal' : ''}
              ${category === 'Arts' ? 'bg-campus-pink' : ''}
              ${category === 'Academic' ? 'bg-campus-purple' : ''}
            `}
          >
            {category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-xl line-clamp-2">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center text-white/70">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        
        <div className="flex items-center text-white/70">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{time}</span>
        </div>
        
        <div className="flex items-center text-white/70">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center text-white/70">
          <Users className="h-4 w-4 mr-2" />
          <span className="text-sm">{attendees} attending</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          className="flex-1 bg-campus-purple hover:bg-campus-purple/80" 
          onClick={handleRSVP}
        >
          RSVP
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-campus-pink text-campus-pink hover:bg-campus-pink/10"
                onClick={handleSave}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save this event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-campus-teal text-campus-teal hover:bg-campus-teal/10"
                onClick={() => handleVote('up')}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upvote this event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-gray-500 text-gray-500 hover:bg-gray-500/10"
                onClick={() => handleVote('down')}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Downvote this event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
