
import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface BannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

const Banner = ({ title, description, buttonText, buttonLink, imageUrl }: BannerProps) => {
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  
  const generateBanner = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate a banner.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call the OpenAI API
    toast({
      title: "AI Banner Generation",
      description: "Your banner is being generated. This would typically use OpenAI or another AI service.",
    });
    
    // Reset state
    setPrompt('');
    setShowAIGenerator(false);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl mb-8">
      <img 
        src={imageUrl} 
        alt="Campus Event" 
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-hero-pattern flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 campus-gradient-text">
          {title}
        </h1>
        <p className="text-white/80 max-w-xl mb-8 text-lg">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button 
            className="flex-1 bg-campus-teal hover:bg-campus-teal/90 text-black"
            asChild
          >
            <a href={buttonLink}>{buttonText}</a>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 border-campus-pink text-white hover:bg-campus-pink/10"
            onClick={() => setShowAIGenerator(!showAIGenerator)}
          >
            <Wand2 className="h-4 w-4 mr-2 text-campus-pink" />
            AI Banner
          </Button>
        </div>
        
        {showAIGenerator && (
          <div className="mt-6 p-4 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 w-full max-w-md animate-fade-in">
            <h3 className="text-white mb-2 font-medium">Generate AI Banner</h3>
            <div className="flex gap-2">
              <Input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal event banner..." 
                className="bg-black/20 border-white/20"
              />
              <Button onClick={generateBanner}>
                Generate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
