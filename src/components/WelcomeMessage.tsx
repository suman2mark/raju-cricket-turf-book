import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const WelcomeMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show welcome message after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
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
        
        <p className="text-white/90 leading-relaxed">
          Experience the thrill of cricket at our premium facility. Book your slot now and enjoy world-class pitches with modern amenities!
        </p>
        
        <div className="mt-4 text-sm text-white/80 font-medium">
          🏏 Premium Cricket Experience Awaits You
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;