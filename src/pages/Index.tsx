
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import EventCard from '@/components/EventCard';
import AIRecommendation from '@/components/AIRecommendation';
import CalendarView from '@/components/CalendarView';
import FeedbackForm from '@/components/FeedbackForm';
import ResumeBooster from '@/components/ResumeBooster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

// Sample data
const sampleEvents = [
  {
    id: "1",
    title: "Campus Hackathon 2023",
    date: "Oct 25, 2023",
    time: "9:00 AM - 9:00 PM",
    location: "Engineering Building",
    attendees: 120,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1170"
  },
  {
    id: "2",
    title: "Spring Career Fair",
    date: "Nov 5, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Student Union",
    attendees: 250,
    category: "Academic",
    image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&q=80&w=1170"
  },
  {
    id: "3",
    title: "Women in Tech Panel Discussion",
    date: "Nov 10, 2023",
    time: "3:00 PM - 5:00 PM",
    location: "Business School Auditorium",
    attendees: 85,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1170"
  },
  {
    id: "4",
    title: "Annual Spring Concert",
    date: "Nov 18, 2023",
    time: "7:00 PM - 11:00 PM",
    location: "Campus Stadium",
    attendees: 500,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1170"
  },
  {
    id: "5",
    title: "Intramural Basketball Tournament",
    date: "Nov 20, 2023",
    time: "2:00 PM - 8:00 PM",
    location: "Sports Complex",
    attendees: 150,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1169"
  },
  {
    id: "6",
    title: "AI Workshop Series",
    date: "Dec 1, 2023",
    time: "4:00 PM - 6:00 PM",
    location: "Computer Science Building",
    attendees: 75,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1170"
  }
];

// Sample calendar events
const calendarEvents = sampleEvents.map(event => ({
  date: new Date(event.date),
  title: event.title,
  category: event.category
}));

// Sample AI recommendations
const aiRecommendations = [
  {
    reasonText: "Based on your interest in technology events and previous attendance at coding workshops, we recommend these upcoming tech events:",
    events: sampleEvents.filter(event => event.category === "Tech")
  },
  {
    reasonText: "Students in your Computer Science program are attending these popular events:",
    events: [sampleEvents[0], sampleEvents[2], sampleEvents[5]]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('events');

  // Effect to scroll to section based on hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      if (['events', 'for-you', 'saved', 'voting'].includes(id)) {
        setActiveTab(id);
        
        // Small delay to ensure tab content is rendered before scroll
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else if (['resume', 'feedback'].includes(id)) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  const filteredEvents = sampleEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter events based on active tab
  const savedEvents = sampleEvents.slice(0, 3);
  const votedEvents = sampleEvents.slice(2, 5);

  return (
    <div className="min-h-screen bg-campus-dark text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Banner 
          title="Discover Campus Events & Activities"
          description="Find, save, and get personalized recommendations for all campus events in one place."
          buttonText="Browse Events"
          buttonLink="#events"
          imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1170"
        />
        
        <div id="tabs-container" className="scroll-mt-20">
          <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-lg mx-auto mb-8 bg-campus-dark border border-white/10 overflow-x-auto no-scrollbar rounded-full p-1">
              <TabsTrigger id="events" value="events" className="rounded-full flex-1">All Events</TabsTrigger>
              <TabsTrigger id="for-you" value="for-you" className="rounded-full flex-1">For You</TabsTrigger>
              <TabsTrigger id="saved" value="saved" className="rounded-full flex-1">Saved</TabsTrigger>
              <TabsTrigger id="voting" value="voting" className="rounded-full flex-1">Voting</TabsTrigger>
            </TabsList>
            
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, categories, locations..."
                  className="pl-10 pr-4 py-6 bg-campus-darkAccent border-white/10 focus:border-campus-teal"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Filter className="h-5 w-5 text-white/60" />
                </Button>
              </div>
            </div>
            
            {/* All Events Tab */}
            <TabsContent value="events" className="border-none p-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </TabsContent>
            
            {/* For You Tab */}
            <TabsContent value="for-you" className="border-none p-0 animate-fade-in">
              <div className="mb-12">
                {aiRecommendations.map((recommendation, idx) => (
                  <AIRecommendation 
                    key={idx} 
                    reasonText={recommendation.reasonText} 
                    events={recommendation.events} 
                  />
                ))}
              </div>
            </TabsContent>
            
            {/* Saved Tab */}
            <TabsContent value="saved" className="border-none p-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedEvents.map(event => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </TabsContent>
            
            {/* Voting Tab */}
            <TabsContent value="voting" className="border-none p-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {votedEvents.map(event => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16" id="resume">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">Event Calendar</h2>
            <CalendarView events={calendarEvents} />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white">Resume Booster</h2>
              <ResumeBooster />
            </div>
            
            <div id="feedback">
              <h2 className="text-2xl font-semibold mb-6 text-white">Feedback</h2>
              <FeedbackForm />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-campus-darkAccent/80 border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/60 mb-4">© 2023 EaseEve. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white/60 hover:text-campus-teal transition-colors">About</a>
            <a href="#" className="text-white/60 hover:text-campus-teal transition-colors">Privacy</a>
            <a href="#" className="text-white/60 hover:text-campus-teal transition-colors">Terms</a>
            <a href="#" className="text-white/60 hover:text-campus-teal transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
