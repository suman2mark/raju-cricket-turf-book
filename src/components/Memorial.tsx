import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Memorial: React.FC = () => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer transition-all duration-1000 hover:scale-110 group relative">
              {/* Divine light aura - multiple ethereal layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-200/40 via-pink-100/50 to-purple-200/40 blur-3xl scale-200 animate-pulse opacity-60 group-hover:opacity-90 transition-all duration-1500"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-100/30 via-yellow-50/40 to-rose-100/30 blur-2xl scale-175 animate-pulse opacity-50 group-hover:opacity-80 transition-all duration-1200" style={{animationDelay: '0.7s'}}></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-100/25 via-pink-50/35 to-amber-100/25 blur-xl scale-150 animate-pulse opacity-40 group-hover:opacity-70 transition-all duration-1000" style={{animationDelay: '1.4s'}}></div>
              
              {/* Inner sacred glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/80 via-rose-50/60 to-transparent scale-160 animate-pulse" style={{animationDelay: '2s'}}></div>
              
              {/* Main avatar with heavenly styling */}
              <Avatar className="relative w-12 h-12 border-2 border-gradient-to-br from-rose-300/90 via-pink-200 to-purple-300/90 shadow-[0_0_20px_rgba(244,114,182,0.6)] hover:shadow-[0_0_30px_rgba(244,114,182,0.8)] transition-all duration-1000 ring-3 ring-rose-100/60 ring-offset-2 ring-offset-white/95 group-hover:ring-rose-200/80 group-hover:ring-offset-rose-25/40">
                <AvatarImage 
                  src="/lovable-uploads/082875b7-798c-40c6-a25d-0f0a86b3441f.png" 
                  alt="In Eternal Memory of My Beloved Mother" 
                  className="object-cover transition-all duration-1000 group-hover:brightness-115 group-hover:contrast-110 filter sepia-[0.05] group-hover:sepia-0 saturate-110 group-hover:saturate-125"
                />
                <AvatarFallback className="bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 text-rose-600 text-3xl">
                  <span className="animate-pulse">👑</span>
                </AvatarFallback>
              </Avatar>
              
              {/* Enhanced memorial badge with deeper meaning */}
              <div className="mt-2 text-[9px] font-bold text-center text-white bg-gradient-to-r from-rose-600/98 via-pink-500/98 to-purple-600/98 rounded-full px-2 py-1 shadow-lg backdrop-blur-md border border-rose-200/60 transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.7)] group-hover:border-rose-300/80">
                <span className="drop-shadow-lg tracking-wide font-bold">Forever My Angel</span>
              </div>
              
              {/* Clean celestial elements */}
              <div className="absolute top-0 right-0 text-rose-400 text-sm opacity-80 animate-pulse group-hover:opacity-100 transition-all duration-700" style={{animationDelay: '0s', filter: 'drop-shadow(0 0 4px rgba(244, 114, 182, 0.8))'}}>✨</div>
              
              <div className="absolute top-2 left-0 text-pink-300 text-xs opacity-70 animate-bounce" style={{animationDelay: '1s', filter: 'drop-shadow(0 0 3px rgba(253, 164, 175, 0.9))'}}>💖</div>
              
              <div className="absolute bottom-0 right-1 text-purple-400 text-sm opacity-85 animate-pulse" style={{animationDelay: '1.8s', filter: 'drop-shadow(0 0 4px rgba(196, 181, 253, 0.8))'}}>⭐</div>
              
              <div className="absolute top-1 left-1 text-rose-200 text-xs opacity-60 animate-ping" style={{animationDelay: '2.5s', filter: 'drop-shadow(0 0 3px rgba(251, 207, 232, 0.9))'}}>💕</div>
              
              {/* Heavenly orbiting effects */}
              <div className="absolute inset-0 rounded-full border-2 border-rose-200/30 scale-140 animate-spin opacity-40" style={{animationDuration: '25s'}}></div>
              <div className="absolute inset-0 rounded-full border border-pink-200/20 scale-120 animate-spin opacity-30" style={{animationDuration: '18s', animationDirection: 'reverse'}}></div>
              <div className="absolute inset-0 rounded-full border border-purple-200/15 scale-110 animate-spin opacity-25" style={{animationDuration: '12s'}}></div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gradient-to-br from-white/99 via-rose-25/98 to-pink-50/99 backdrop-blur-2xl border-2 border-rose-200/70 shadow-[0_0_30px_rgba(244,114,182,0.4)] p-4 max-w-[280px] rounded-2xl ring-1 ring-rose-100/60">
            <div className="text-center space-y-2">
              {/* Divine top ornament */}
              <div className="flex justify-center items-center space-x-2 mb-3">
                <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-pink-400 animate-pulse"></div>
                <span className="text-rose-400 text-lg animate-pulse">✨</span>
                <span className="text-pink-400 text-sm animate-pulse" style={{animationDelay: '0.5s'}}>👑</span>
                <span className="text-rose-400 text-lg animate-pulse" style={{animationDelay: '1s'}}>✨</span>
                <div className="w-6 h-0.5 bg-gradient-to-r from-pink-400 via-rose-400 to-transparent animate-pulse"></div>
              </div>
              
              <div className="space-y-2">
                <p className="text-base text-gray-800 font-bold tracking-wide bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                  In Eternal Memory
                </p>
                <p className="text-sm text-rose-800/95 font-semibold">
                  My Beloved Mother
                </p>
                <p className="text-xs text-pink-700/85 italic leading-relaxed">
                  Two years have passed, but your love remains my guiding light
                </p>
              </div>
              
              {/* Enhanced decorative heart section */}
              <div className="py-2">
                <div className="flex justify-center items-center space-x-1">
                  <span className="text-rose-400 text-sm animate-pulse">♥</span>
                  <span className="text-pink-400 text-base animate-pulse" style={{animationDelay: '0.3s'}}>♥</span>
                  <span className="text-purple-500 text-lg animate-pulse" style={{animationDelay: '0.6s'}}>♥</span>
                  <span className="text-pink-400 text-base animate-pulse" style={{animationDelay: '0.9s'}}>♥</span>
                  <span className="text-rose-400 text-sm animate-pulse" style={{animationDelay: '1.2s'}}>♥</span>
                </div>
              </div>
              
              {/* Heavenly bottom ornament */}
              <div className="flex justify-center items-center space-x-2 mt-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-pink-300 animate-pulse"></div>
                <span className="text-pink-400 text-sm animate-pulse">🌟</span>
                <span className="text-white text-sm animate-pulse" style={{animationDelay: '0.5s'}}>🕊️</span>
                <span className="text-pink-400 text-sm animate-pulse" style={{animationDelay: '1s'}}>🌟</span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-pink-300 via-rose-300 to-transparent animate-pulse"></div>
              </div>
              
              {/* Memorial date and touching message */}
              <div className="text-xs text-rose-600/75 italic pt-1 font-light">
                <div>Forever in my heart</div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Memorial;
