
import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Import the necessary CSS for react-calendar
// Note: In a real project, you'd add react-calendar as a dependency
// For this demo, we've added styles in index.css

interface CalendarEvent {
  date: Date;
  title: string;
  category: string;
}

interface CalendarViewProps {
  events: CalendarEvent[];
}

const CalendarView = ({ events }: CalendarViewProps) => {
  const [value, setValue] = useState<Value>(new Date());
  const [activeView, setActiveView] = useState('month');
  const { toast } = useToast();

  // Function to check if a date has events
  const hasEvents = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get events for the selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (value: Value) => {
    setValue(value);
    if (value instanceof Date) {
      const dateEvents = getEventsForDate(value);
      
      if (dateEvents.length > 0) {
        toast({
          title: `Events on ${value.toLocaleDateString()}`,
          description: `${dateEvents.length} event${dateEvents.length !== 1 ? 's' : ''} scheduled`,
        });
      }
    }
  };

  // Custom tile content for the calendar
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && hasEvents(date)) {
      return (
        <div className="flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-campus-teal mt-1"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-campus-darkAccent/80 rounded-xl p-4 border border-white/10 backdrop-blur-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Event Calendar</h2>
      
      <Tabs defaultValue="month" value={activeView} onValueChange={setActiveView}>
        <TabsList className="mb-4 bg-campus-dark">
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        
        <TabsContent value="month">
          <ReactCalendar
            onChange={handleDateClick}
            value={value}
            tileContent={tileContent}
            className="border-none shadow-none"
          />
        </TabsContent>
        
        <TabsContent value="agenda">
          <div className="space-y-4 h-[300px] overflow-y-auto pr-2 customScrollbar">
            {value instanceof Date && getEventsForDate(value).length > 0 ? (
              getEventsForDate(value).map((event, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-lg bg-campus-dark border border-white/10 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <p className="text-sm text-white/70">
                      {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Badge className={
                    event.category === 'Tech' ? 'bg-campus-blue' :
                    event.category === 'Sports' ? 'bg-campus-teal' :
                    event.category === 'Arts' ? 'bg-campus-pink' : 'bg-campus-purple'
                  }>
                    {event.category}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/60">
                <p>No events on selected date</p>
                {value instanceof Date && (
                  <p className="text-sm">{value.toLocaleDateString()}</p>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarView;
