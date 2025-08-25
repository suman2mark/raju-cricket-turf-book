
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BookingFormData } from '@/types';
import { formatDate, formatSlotTime, ADMIN_WHATSAPP_NUMBER } from '@/lib/utils';
import { generateInvoicePDF } from '@/lib/invoiceGenerator';
import { Trophy, Star, Zap } from 'lucide-react';

interface BookingSuccessProps {
  bookingData: BookingFormData;
  onResetForm: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ 
  bookingData, 
  onResetForm 
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Cricket shot videos array
  const cricketVideos = [
    '/lovable-uploads/peddi2.mp4',
    '/lovable-uploads/peddi3.gif',
    '/lovable-uploads/peddi4.gif'
  ];

  // Auto-generate invoice PDF when component mounts
  useEffect(() => {
    try {
      console.log("Auto-generating invoice for booking data:", bookingData);
      if (bookingData && bookingData.slot) {
        generateInvoicePDF(bookingData);
      } else {
        console.error("Cannot generate invoice: Invalid booking data");
      }
    } catch (error) {
      console.error("Error auto-generating PDF:", error);
    }
  }, [bookingData]);

  // Auto-rotate cricket videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % cricketVideos.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [cricketVideos.length]);

  // Calculate the final price with discount if applicable
  const calculateFinalPrice = () => {
    if (!bookingData || !bookingData.slot) return 0;
    
    const basePrice = bookingData.slot.price;
    if (bookingData.couponCode === 'WELCOME10') {
      return basePrice * 0.9; // 10% discount
    }
    return basePrice;
  };

  const handleDownloadInvoice = () => {
    try {
      console.log("Generating invoice for booking data:", bookingData);
      if (bookingData && bookingData.slot) {
        generateInvoicePDF(bookingData);
      } else {
        console.error("Cannot generate invoice: Invalid booking data");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 p-8 rounded-xl shadow-xl border border-primary/20">
      {/* Cricket Animation Background */}
      <div className="absolute top-4 right-4 w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-primary/20">
        {cricketVideos[currentVideoIndex].endsWith('.mp4') ? (
          <video
            key={currentVideoIndex}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src={cricketVideos[currentVideoIndex]} type="video/mp4" />
          </video>
        ) : (
          <img
            key={currentVideoIndex}
            src={cricketVideos[currentVideoIndex]}
            alt="Cricket shot animation"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Animated Elements */}
      <div className="absolute top-6 left-6 animate-bounce">
        <Trophy className="h-8 w-8 text-yellow-500" />
      </div>
      <div className="absolute top-16 left-16 animate-pulse">
        <Star className="h-6 w-6 text-blue-500" />
      </div>
      <div className="absolute bottom-6 right-20 animate-bounce delay-300">
        <Zap className="h-6 w-6 text-orange-500" />
      </div>
      
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Success Icon with Animation */}
        <div className="mb-6 relative">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg animate-scale-in">
            <svg className="h-12 w-12 text-white animate-fade-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 h-6 w-6 bg-primary rounded-full animate-ping"></div>
        </div>
        
        {/* Cricket-themed Success Message */}
        <div className="mb-6 space-y-2">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            🏏 HOWZAT! 🏏
          </h3>
          <h4 className="text-xl font-semibold text-gray-800">
            Your Cricket Session is Booked!
          </h4>
          <p className="text-gray-600 italic">
            "Champions are made on the practice ground"
          </p>
        </div>
        
        {/* Booking Details Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-primary/30 rounded-lg p-6 mb-6 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <p className="font-semibold text-gray-800">Match Details</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-bold text-primary">{formatDate(bookingData.date)}</p>
              <p className="text-lg font-bold text-secondary">{bookingData.slot ? formatSlotTime(bookingData.slot) : ''}</p>
              <p className="text-sm text-gray-600">Players: {bookingData.players}</p>
            </div>
            
            {bookingData && bookingData.slot && (
              <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                {bookingData.couponCode === 'WELCOME10' ? (
                  <div className="space-y-1">
                    <p className="text-sm line-through text-gray-500">Original: ₹{bookingData.slot.price}</p>
                    <p className="font-bold text-green-600 text-lg">
                      Final Amount: ₹{calculateFinalPrice()} 
                      <span className="text-xs block text-green-500">🎉 Welcome Discount Applied!</span>
                    </p>
                  </div>
                ) : (
                  <p className="font-bold text-lg text-primary">Amount: ₹{bookingData.slot.price}</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Next Steps with Cricket Theme */}
        <Alert className="mb-6 text-left border-primary/30 bg-gradient-to-r from-blue-50 to-green-50">
          <Trophy className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">Ready to Play? Here's What's Next:</AlertTitle>
          <AlertDescription>
            <div className="space-y-2 mt-3 text-sm">
              <p className="flex items-center">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                Gear up! The pitch is waiting for you 🏏
              </p>
              <p className="flex items-center">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                Arrive 15 minutes early to warm up
              </p>
              <p className="flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Pay at venue - cash or digital accepted
              </p>
              <p className="flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Admin has been notified - you're all set!
              </p>
            </div>
          </AlertDescription>
        </Alert>
        
        {/* Contact Info */}
        <div className="mb-6 p-4 bg-white/70 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Need help? Contact our team:</p>
          <p className="font-semibold text-primary">{ADMIN_WHATSAPP_NUMBER}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <Button 
            onClick={handleDownloadInvoice}
            className="flex items-center justify-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Invoice
          </Button>
          
          <Button 
            onClick={onResetForm}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Book Another Session
          </Button>
        </div>
        
        {/* Motivational Quote */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <p className="text-sm italic text-gray-700">
            "The game of cricket is a teacher of life lessons - patience, perseverance, and teamwork."
          </p>
          <p className="text-xs text-gray-500 mt-1">- Good luck with your practice session! 🏆</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
