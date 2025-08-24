import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Memorial: React.FC = () => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer transition-all duration-500 hover:scale-110 group">
              {/* Glowing halo effect with love theme */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-200/20 via-pink-200/30 to-rose-200/20 blur-md animate-pulse scale-125 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Soft radial glow with warm love colors */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-pink-100/40 via-rose-50/20 to-transparent scale-150 animate-pulse"></div>
              
              <Avatar className="relative w-12 h-12 border-3 border-gradient-to-r from-rose-200/80 via-pink-100 to-rose-200/80 shadow-lg hover:shadow-xl transition-all duration-500 ring-2 ring-pink-100/50 ring-offset-2 ring-offset-white/80">
                <AvatarImage 
                  src="/lovable-uploads/082875b7-798c-40c6-a25d-0f0a86b3441f.png" 
                  alt="In Loving Memory" 
                  className="object-cover transition-all duration-500 group-hover:brightness-110"
                />
                <AvatarFallback className="bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 text-rose-700 text-lg animate-pulse">❤️</AvatarFallback>
              </Avatar>
              
              {/* Enhanced memorial badge with love theme */}
              <div className="mt-1.5 text-[9px] font-semibold text-center text-white bg-gradient-to-r from-rose-600/90 via-pink-500/90 to-rose-600/90 rounded-full px-3 py-0.5 shadow-lg backdrop-blur-md border border-pink-200/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-pink-200/50">
                <span className="drop-shadow-sm">In Memory</span>
              </div>
              
              {/* Floating love symbols */}
              <div className="absolute -top-1 -right-1 text-pink-400 text-xs opacity-60 animate-pulse group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0s', filter: 'drop-shadow(0 0 3px rgba(244, 114, 182, 0.5))'}}>💖</div>
              <div className="absolute top-2 -left-2 text-rose-300 text-[10px] opacity-50 animate-bounce" style={{animationDelay: '0.5s', filter: 'drop-shadow(0 0 2px rgba(253, 164, 175, 0.6))'}}>💕</div>
              <div className="absolute -bottom-1 right-2 text-red-400 text-xs opacity-70 animate-pulse" style={{animationDelay: '1s', filter: 'drop-shadow(0 0 2px rgba(248, 113, 113, 0.5))'}}>❤️</div>
              <div className="absolute top-0 left-0 text-pink-300 text-[8px] opacity-40 animate-ping" style={{animationDelay: '1.5s', filter: 'drop-shadow(0 0 1px rgba(249, 168, 212, 0.7))'}}>💗</div>
              <div className="absolute bottom-1 -left-1 text-rose-400 text-[9px] opacity-55 animate-bounce" style={{animationDelay: '2s', filter: 'drop-shadow(0 0 2px rgba(251, 113, 133, 0.6))'}}>💝</div>
              <div className="absolute -top-0.5 left-1 text-red-300 text-[7px] opacity-45 animate-pulse" style={{animationDelay: '2.5s', filter: 'drop-shadow(0 0 1px rgba(252, 165, 165, 0.5))'}}>💓</div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gradient-to-br from-white/95 via-amber-50/90 to-white/95 backdrop-blur-md border-2 border-amber-200/40 shadow-2xl p-5 max-w-[220px] rounded-2xl">
            <div className="text-center space-y-2">
              {/* Golden divider */}
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-3"></div>
              
              <p className="text-sm text-gray-800 font-semibold tracking-wide">In Loving Memory</p>
              <p className="text-xs text-amber-700/80 italic font-medium">Forever in our hearts</p>
              
              {/* Decorative hearts */}
              <div className="flex justify-center space-x-1 mt-3 opacity-60">
                <span className="text-amber-400 text-xs">♥</span>
                <span className="text-yellow-400 text-[10px]">♥</span>
                <span className="text-amber-400 text-xs">♥</span>
              </div>
              
              {/* Bottom golden divider */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-3"></div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Memorial;
