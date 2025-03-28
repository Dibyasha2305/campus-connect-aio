
import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import EventCard from './EventCard';

interface AIRecommendationProps {
  reasonText: string;
  events: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    category: string;
    image: string;
  }>;
}

const AIRecommendation = ({ reasonText, events }: AIRecommendationProps) => {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center">
        <div className="flex items-center bg-campus-purple/30 p-2 rounded-lg">
          <Sparkles className="h-5 w-5 mr-2 text-campus-pink animate-pulse-subtle" />
          <Lightbulb className="h-5 w-5 text-campus-teal" />
        </div>
        <h3 className="ml-3 text-white text-lg font-medium">AI Recommendation</h3>
      </div>
      
      <div className="p-4 mb-6 rounded-xl bg-gradient-to-r from-campus-purple/20 to-campus-blue/10 border border-white/10">
        <p className="text-white/90 italic">{reasonText}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default AIRecommendation;
