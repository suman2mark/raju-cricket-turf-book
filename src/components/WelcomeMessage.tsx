import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Users } from 'lucide-react';
import { getBookingsForDate } from '@/services/bookingService';

const WelcomeMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [todayBookings, setTodayBookings] = useState<any[]>([]);

  useEffect(() => {
    // Fetch today's bookings
    const fetchTodayBookings = async () => {
      try {
        const bookings = await getBookingsForDate(new Date());
        setTodayBookings(bookings);
      } catch (error) {
        console.error('Failed to fetch today\'s bookings:', error);
        setTodayBookings([]);
      }
    };

    fetchTodayBookings();

    // Show welcome message after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    // Auto-hide after 5 seconds
    const autoHideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoHideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl shadow-2xl p-6 max-w-md mx-4 relative border border-white/20">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
          aria-label="Close welcome message"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Welcome to Our Cricket Ground!</h2>
        </div>
        
        <p className="text-white/90 leading-relaxed mb-3">
          Experience the thrill of cricket at our premium facility. Book your slot now and enjoy world-class pitches with modern amenities!
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="w-4 h-4" />
              <span>Today's Bookings: <span className="font-bold text-white">{todayBookings.length}</span></span>
            </div>
            <div className="text-white/80 font-medium">
              🏏 Premium Cricket Experience
            </div>
          </div>
          
          {todayBookings.length > 0 && (
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Recent Bookings:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {todayBookings.slice(0, 3).map((booking: any, index: number) => (
                  <div key={index} className="bg-white/20 rounded-full px-3 py-1 text-xs text-white font-medium">
                    {booking.name} ({booking.players} players)
                  </div>
                ))}
                {todayBookings.length > 3 && (
                  <div className="bg-white/20 rounded-full px-3 py-1 text-xs text-white font-medium">
                    +{todayBookings.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
