
import React from 'react';
import { Award, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface AttendedEvent {
  id: string;
  title: string;
  date: string;
  skills: string[];
  certificateAvailable: boolean;
}

const ResumeBooster = () => {
  const { toast } = useToast();
  
  const attendedEvents: AttendedEvent[] = [
    {
      id: "event1",
      title: "Tech Leadership Workshop",
      date: "March 15, 2023",
      skills: ["Leadership", "Communication", "Project Management"],
      certificateAvailable: true
    },
    {
      id: "event2",
      title: "Web Development Bootcamp",
      date: "April 3, 2023",
      skills: ["JavaScript", "React", "API Integration"],
      certificateAvailable: true
    },
    {
      id: "event3",
      title: "Design Thinking Seminar",
      date: "May 12, 2023",
      skills: ["UI/UX", "Prototyping", "User Research"],
      certificateAvailable: false
    }
  ];
  
  const skillsGained = [
    { skill: "Leadership", level: 75 },
    { skill: "JavaScript", level: 85 },
    { skill: "UI/UX Design", level: 60 },
    { skill: "Communication", level: 80 },
    { skill: "Project Management", level: 70 }
  ];
  
  const downloadCertificate = (eventId: string) => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };
  
  const exportResume = () => {
    toast({
      title: "Resume Data Exported",
      description: "Your resume data has been exported successfully.",
    });
  };

  return (
    <div className="bg-campus-darkAccent/80 rounded-xl p-6 border border-white/10 backdrop-blur-md">
      <div className="flex items-center mb-6">
        <Award className="h-6 w-6 text-campus-teal mr-2" />
        <h2 className="text-2xl font-semibold text-white">Resume Booster</h2>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Skills Gained</h3>
        <div className="space-y-4">
          {skillsGained.map((skill, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">{skill.skill}</span>
                <span className="text-campus-teal">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2 bg-campus-dark" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Attended Events</h3>
        <div className="space-y-4">
          {attendedEvents.map((event) => (
            <div 
              key={event.id} 
              className="p-4 rounded-lg bg-campus-dark/60 border border-white/10"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">{event.title}</h4>
                {event.certificateAvailable && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-campus-teal text-campus-teal hover:bg-campus-teal/10 h-8 px-2"
                    onClick={() => downloadCertificate(event.id)}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Certificate
                  </Button>
                )}
              </div>
              <p className="text-sm text-white/70 mb-2">{event.date}</p>
              <div className="flex flex-wrap gap-2">
                {event.skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center text-xs text-campus-teal bg-campus-teal/10 px-2 py-1 rounded-full"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={exportResume}
        className="w-full bg-campus-purple hover:bg-campus-purple/90"
      >
        <Download className="h-4 w-4 mr-2" />
        Export for Resume
      </Button>
    </div>
  );
};

export default ResumeBooster;
