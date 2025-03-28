
import React, { useState } from 'react';
import { Bell, Calendar, User, Menu, X } from 'lucide-react';
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
                  <a href="#events" className="text-white hover:text-campus-teal transition-colors">Events</a>
                  <a href="#for-you" className="text-white hover:text-campus-teal transition-colors">For You</a>
                  <a href="#saved" className="text-white hover:text-campus-teal transition-colors">Saved</a>
                  <a href="#voting" className="text-white hover:text-campus-teal transition-colors">Voting</a>
                  <a href="#resume" className="text-white hover:text-campus-teal transition-colors">Resume Booster</a>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-campus-teal to-campus-blue bg-clip-text text-transparent">
              Campus<span className="text-campus-pink">Connect</span>
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#events" className="text-white hover:text-campus-teal transition-colors">Events</a>
            <a href="#for-you" className="text-white hover:text-campus-teal transition-colors">For You</a>
            <a href="#saved" className="text-white hover:text-campus-teal transition-colors">Saved</a>
            <a href="#voting" className="text-white hover:text-campus-teal transition-colors">Voting</a>
            <a href="#resume" className="text-white hover:text-campus-teal transition-colors">Resume Booster</a>
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
