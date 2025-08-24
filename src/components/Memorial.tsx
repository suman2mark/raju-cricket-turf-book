import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Memorial: React.FC = () => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer transition-all duration-700 hover:scale-105 group relative">
              {/* Outer ethereal glow - multiple layers for depth */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/30 via-yellow-100/40 to-amber-200/30 blur-xl scale-150 animate-pulse opacity-50 group-hover:opacity-80 transition-all duration-1000"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-200/20 via-pink-100/30 to-rose-200/20 blur-lg scale-130 animate-pulse opacity-60 group-hover:opacity-90 transition-all duration-1000" style={{animationDelay: '0.5s'}}></div>
              
              {/* Inner radial warmth */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-amber-50/50 via-yellow-50/30 to-transparent scale-140 animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Main avatar with enhanced styling */}
              <Avatar className="relative w-16 h-16 border-4 border-gradient-to-br from-amber-200/90 via-yellow-100 to-amber-200/90 shadow-2xl hover:shadow-amber-200/50 transition-all duration-700 ring-4 ring-amber-100/40 ring-offset-4 ring-offset-white/90 group-hover:ring-amber-200/60 group-hover:ring-offset-amber-50/30">
                <AvatarImage 
                  src="/lovable-uploads/082875b7-798c-40c6-a25d-0f0a86b3441f.png" 
                  alt="In Loving Memory of Mother" 
                  className="object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-105 filter sepia-[0.1] group-hover:sepia-0"
                />
                <AvatarFallback className="bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 text-amber-700 text-2xl">
                  <span className="animate-pulse">🌟</span>
                </AvatarFallback>
              </Avatar>
              
              {/* Enhanced memorial badge */}
              <div className="mt-3 text-[10px] font-bold text-center text-white bg-gradient-to-r from-amber-600/95 via-yellow-500/95 to-amber-600/95 rounded-full px-4 py-1.5 shadow-xl backdrop-blur-md border-2 border-amber-200/50 transition-all duration-500 group-hover:scale-110 group-hover:shadow-amber-300/60 group-hover:border-amber-300/70">
                <span className="drop-shadow-lg tracking-wider">Forever Loved</span>
              </div>
              
              {/* Floating flowers and love symbols with staggered animations */}
              <div className="absolute -top-2 -right-2 text-pink-400 text-lg opacity-70 animate-pulse group-hover:opacity-100 transition-all duration-500" style={{animationDelay: '0s', filter: 'drop-shadow(0 0 6px rgba(244, 114, 182, 0.6))'}}>🌹</div>
              
              <div className="absolute top-3 -left-3 text-rose-300 text-sm opacity-60 animate-bounce" style={{animationDelay: '1s', filter: 'drop-shadow(0 0 4px rgba(253, 164, 175, 0.7))'}}>💖</div>
              
              <div className="absolute -bottom-1 right-3 text-purple-400 text-base opacity-80 animate-pulse" style={{animationDelay: '1.5s', filter: 'drop-shadow(0 0 5px rgba(196, 181, 253, 0.6))'}}>🌷</div>
              
              <div className="absolute top-1 left-1 text-pink-200 text-xs opacity-50 animate-ping" style={{animationDelay: '2s', filter: 'drop-shadow(0 0 3px rgba(251, 207, 232, 0.8))'}}>💕</div>
              
              <div className="absolute bottom-2 -left-2 text-rose-400 text-sm opacity-65 animate-bounce" style={{animationDelay: '2.5s', filter: 'drop-shadow(0 0 4px rgba(251, 113, 133, 0.7))'}}>🌸</div>
              
              <div className="absolute -top-1 left-2 text-pink-300 text-xs opacity-55 animate-pulse" style={{animationDelay: '3s', filter: 'drop-shadow(0 0 3px rgba(249, 168, 212, 0.6))'}}>❤️</div>
              
              <div className="absolute top-0 right-0 text-violet-300 text-xs opacity-45 animate-ping" style={{animationDelay: '3.5s', filter: 'drop-shadow(0 0 2px rgba(196, 181, 253, 0.7))'}}>🌺</div>
              
              <div className="absolute bottom-0 left-4 text-rose-300 text-xs opacity-50 animate-bounce" style={{animationDelay: '4s', filter: 'drop-shadow(0 0 3px rgba(253, 164, 175, 0.6))'}}>💝</div>
              
              <div className="absolute -bottom-2 -right-1 text-pink-500 text-sm opacity-60 animate-pulse" style={{animationDelay: '4.5s', filter: 'drop-shadow(0 0 4px rgba(236, 72, 153, 0.6))'}}>🌻</div>
              
              <div className="absolute top-4 right-1 text-fuchsia-300 text-xs opacity-45 animate-bounce" style={{animationDelay: '5s', filter: 'drop-shadow(0 0 3px rgba(240, 171, 252, 0.7))'}}>💗</div>
              
              <div className="absolute bottom-3 left-0 text-rose-200 text-xs opacity-50 animate-ping" style={{animationDelay: '5.5s', filter: 'drop-shadow(0 0 2px rgba(254, 205, 211, 0.8))'}}>🌼</div>
              
              <div className="absolute -top-3 left-3 text-pink-400 text-sm opacity-55 animate-pulse" style={{animationDelay: '6s', filter: 'drop-shadow(0 0 4px rgba(244, 114, 182, 0.6))'}}>💓</div>
              
              {/* Subtle orbiting light effect */}
              <div className="absolute inset-0 rounded-full border border-amber-200/20 scale-125 animate-spin opacity-30" style={{animationDuration: '20s'}}></div>
              <div className="absolute inset-0 rounded-full border border-yellow-200/15 scale-110 animate-spin opacity-25" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gradient-to-br from-white/98 via-amber-25/95 to-cream-50/98 backdrop-blur-xl border-3 border-amber-200/60 shadow-2xl p-6 max-w-[260px] rounded-3xl ring-1 ring-amber-100/50">
            <div className="text-center space-y-3">
              {/* Elegant top ornament */}
              <div className="flex justify-center items-center space-x-2 mb-4">
                <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-amber-300"></div>
                <span className="text-amber-500 text-lg">✨</span>
                <div className="w-6 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-transparent"></div>
              </div>
              
              <div className="space-y-2">
                <p className="text-base text-gray-800 font-bold tracking-wide bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
                  In Loving Memory
                </p>
                <p className="text-sm text-amber-800/90 font-medium">
                  A mother's love lives on
                </p>
                <p className="text-xs text-amber-600/80 italic leading-relaxed">
                  Forever cherished, never forgotten
                </p>
              </div>
              
              {/* Decorative heart row */}
              <div className="flex justify-center items-center space-x-2 py-2">
                <span className="text-amber-400 text-sm animate-pulse">♥</span>
                <span className="text-yellow-400 text-base animate-pulse" style={{animationDelay: '0.3s'}}>♥</span>
                <span className="text-amber-500 text-lg animate-pulse" style={{animationDelay: '0.6s'}}>♥</span>
                <span className="text-yellow-400 text-base animate-pulse" style={{animationDelay: '0.9s'}}>♥</span>
                <span className="text-amber-400 text-sm animate-pulse" style={{animationDelay: '1.2s'}}>♥</span>
              </div>
              
              {/* Bottom ornament */}
              <div className="flex justify-center items-center space-x-2 mt-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-yellow-300"></div>
                <span className="text-yellow-400 text-sm">🌟</span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-300 via-amber-300 to-transparent"></div>
              </div>
              
              {/* Subtle date or additional text area */}
              <div className="text-[10px] text-amber-600/70 italic pt-1 font-light">
                Always in our hearts
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Memorial;
