
import React, { useState } from 'react';
import { Bell, Calendar, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import AuthModal from './AuthModal';

const Header = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const showNotification = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new event invitations",
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 md:px-6 py-3 backdrop-blur-md bg-campus-dark/80 border-b border-white/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-campus-darkAccent border-r border-white/10">
                <nav className="flex flex-col gap-4 mt-8">
                  <button onClick={() => scrollToSection('events')} className="text-left text-white hover:text-campus-teal transition-colors">Events</button>
                  <button onClick={() => scrollToSection('for-you')} className="text-left text-white hover:text-campus-teal transition-colors">For You</button>
                  <button onClick={() => scrollToSection('saved')} className="text-left text-white hover:text-campus-teal transition-colors">Saved</button>
                  <button onClick={() => scrollToSection('voting')} className="text-left text-white hover:text-campus-teal transition-colors">Voting</button>
                  <button onClick={() => scrollToSection('resume')} className="text-left text-white hover:text-campus-teal transition-colors">Resume Booster</button>
                  <button onClick={() => scrollToSection('feedback')} className="text-left text-white hover:text-campus-teal transition-colors">Feedback</button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-campus-teal to-campus-blue bg-clip-text text-transparent">
              Ease<span className="text-campus-pink">Eve</span>
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('events')} className="text-white hover:text-campus-teal transition-colors">Events</button>
            <button onClick={() => scrollToSection('for-you')} className="text-white hover:text-campus-teal transition-colors">For You</button>
            <button onClick={() => scrollToSection('saved')} className="text-white hover:text-campus-teal transition-colors">Saved</button>
            <button onClick={() => scrollToSection('voting')} className="text-white hover:text-campus-teal transition-colors">Voting</button>
            <button onClick={() => scrollToSection('resume')} className="text-white hover:text-campus-teal transition-colors">Resume Booster</button>
            <button onClick={() => scrollToSection('feedback')} className="text-white hover:text-campus-teal transition-colors">Feedback</button>
          </nav>
        )}

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={showNotification}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="border-campus-teal text-campus-teal hover:bg-campus-teal/10"
            onClick={() => setAuthModalOpen(true)}
          >
            <User className="h-4 w-4 mr-2" /> Profile
          </Button>
        </div>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
};

export default Header;
