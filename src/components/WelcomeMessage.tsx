import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const WelcomeMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show welcome message after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Auto-hide after 8 seconds (increased for fire effect)
    const autoHideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

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
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative group animate-fade-in">
        {/* Fire Ball Animation Container */}
        <div className="absolute inset-0 scale-150 pointer-events-none">
          {/* Outer Fire Ring - Large blazing circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600/40 via-red-500/50 to-yellow-400/40 blur-3xl animate-spin opacity-80" 
               style={{animationDuration: '4s'}}></div>
          
          {/* Middle Fire Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/50 via-orange-400/60 to-red-600/50 blur-2xl animate-spin opacity-70" 
               style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
          
          {/* Inner Fire Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/60 via-orange-500/70 to-red-500/60 blur-xl animate-spin opacity-90" 
               style={{animationDuration: '2s'}}></div>
          
          {/* Core Fire Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300/50 via-red-400/60 to-yellow-300/50 blur-lg animate-spin opacity-60" 
               style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
        </div>

        {/* Fire Particles - Floating around the widget */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Fire Spark 1 */}
          <div className="absolute -top-8 -left-8 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-bounce opacity-80 blur-sm"
               style={{animationDelay: '0s', filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.8))'}}></div>
          
          {/* Fire Spark 2 */}
          <div className="absolute -top-12 right-4 w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full animate-pulse opacity-90"
               style={{animationDelay: '0.5s', filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.9))'}}></div>
          
          {/* Fire Spark 3 */}
          <div className="absolute top-2 -right-10 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-70"
               style={{animationDelay: '1s', filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))'}}></div>
          
          {/* Fire Spark 4 */}
          <div className="absolute bottom-4 -left-6 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full animate-pulse opacity-85"
               style={{animationDelay: '1.5s', filter: 'drop-shadow(0 0 6px rgba(234, 88, 12, 0.9))'}}></div>
          
          {/* Fire Spark 5 */}
          <div className="absolute -bottom-8 right-8 w-4 h-4 bg-gradient-to-r from-red-400 to-yellow-500 rounded-full animate-bounce opacity-75"
               style={{animationDelay: '2s', filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.8))'}}></div>
          
          {/* Fire Spark 6 */}
          <div className="absolute bottom-8 -right-12 w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full animate-ping opacity-90"
               style={{animationDelay: '2.5s', filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.9))'}}></div>
          
          {/* Fire Spark 7 */}
          <div className="absolute top-8 -left-10 w-3 h-3 bg-gradient-to-r from-orange-600 to-red-400 rounded-full animate-pulse opacity-80"
               style={{animationDelay: '3s', filter: 'drop-shadow(0 0 6px rgba(194, 65, 12, 0.8))'}}></div>
          
          {/* Fire Spark 8 */}
          <div className="absolute -top-6 right-12 w-4 h-4 bg-gradient-to-r from-red-300 to-orange-400 rounded-full animate-bounce opacity-65"
               style={{animationDelay: '3.5s', filter: 'drop-shadow(0 0 8px rgba(252, 165, 165, 0.7))'}}></div>
        </div>

        {/* Flame Trail Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Flame */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-orange-500/60 via-red-400/40 to-transparent rounded-full animate-pulse blur-md"
               style={{animationDelay: '0s'}}></div>
          
          {/* Bottom Flame */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gradient-to-b from-orange-500/60 via-red-400/40 to-transparent rounded-full animate-pulse blur-md"
               style={{animationDelay: '1s'}}></div>
          
          {/* Left Flame */}
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-16 h-8 bg-gradient-to-l from-orange-500/60 via-red-400/40 to-transparent rounded-full animate-pulse blur-md"
               style={{animationDelay: '2s'}}></div>
          
          {/* Right Flame */}
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-16 h-8 bg-gradient-to-r from-orange-500/60 via-red-400/40 to-transparent rounded-full animate-pulse blur-md"
               style={{animationDelay: '3s'}}></div>
        </div>

        {/* Pulsing Fire Aura */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 via-red-500/30 to-yellow-400/20 blur-xl animate-pulse scale-110 opacity-60 pointer-events-none"></div>
        
        {/* Main Widget Container */}
        <div className="relative bg-gradient-to-br from-gray-900/95 via-red-900/90 to-orange-900/95 backdrop-blur-xl text-white rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.6)] p-6 max-w-md mx-4 border-2 border-gradient-to-r from-orange-400/60 via-red-500/60 to-yellow-400/60 hover:shadow-[0_0_70px_rgba(249,115,22,0.8)] transition-all duration-500 group-hover:scale-105">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/30 hover:bg-red-500/50 flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-red-400/30 hover:border-red-300/50 group-hover:rotate-90"
            aria-label="Close welcome message"
          >
            <X className="w-4 h-4 text-red-200 group-hover:text-white" />
          </button>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400/30 to-red-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-orange-300/30 shadow-[0_0_20px_rgba(249,115,22,0.5)]">
              <Sparkles className="w-6 h-6 text-orange-200 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 bg-clip-text text-transparent drop-shadow-lg">
              Welcome to Our Box Cricket Ground!
            </h2>
          </div>
          
          <p className="text-orange-100/90 leading-relaxed mb-4 drop-shadow-md">
            Step into greatness! Where champions are born and legends are made. Your cricket journey begins here with state-of-the-art facilities and an unforgettable experience.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-yellow-500/20 rounded-lg p-4 backdrop-blur-md border border-orange-400/20 shadow-inner text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🏏</span>
                <span className="text-lg font-bold text-orange-200">Ready to Play?</span>
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-orange-100/80 text-sm leading-relaxed">
                "Every great cricketer started with a single step onto the pitch. Make yours count!"
              </p>
              <div className="mt-3 flex justify-center items-center gap-1">
                <span className="text-yellow-300 text-sm animate-pulse">⭐</span>
                <span className="text-orange-200/80 text-xs font-medium">Your Victory Awaits</span>
                <span className="text-yellow-300 text-sm animate-pulse">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Fire Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Ember particles */}
          <div className="absolute top-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-80" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-70" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute bottom-6 left-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-90" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute bottom-8 right-4 w-1 h-1 bg-orange-500 rounded-full animate-ping opacity-75" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-12 left-12 w-1 h-1 bg-red-300 rounded-full animate-ping opacity-60" style={{animationDelay: '2.7s'}}></div>
          
          {/* Heat shimmer effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-orange-200/5 to-transparent animate-pulse scale-105 opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
