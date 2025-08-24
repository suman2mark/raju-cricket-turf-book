import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Memorial: React.FC = () => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer transition-all duration-700 hover:scale-110 group relative">
              {/* Elegant radial glow layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-200/50 via-pink-100/60 to-purple-200/50 blur-3xl scale-200 animate-pulse opacity-70 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-100/40 via-rose-50/50 to-pink-100/40 blur-2xl scale-175 animate-pulse opacity-60 group-hover:opacity-90 transition-all duration-800" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/70 via-rose-50/50 to-transparent scale-150 animate-pulse opacity-80 group-hover:opacity-100 transition-all duration-600" style={{animationDelay: '1s'}}></div>
              
              {/* Main avatar with elegant styling */}
              <Avatar className="relative w-12 h-12 border-2 border-gradient-to-br from-rose-300/80 via-pink-200 to-purple-300/80 shadow-[0_0_25px_rgba(244,114,182,0.7)] hover:shadow-[0_0_35px_rgba(244,114,182,0.9)] transition-all duration-700 ring-2 ring-rose-100/70 ring-offset-2 ring-offset-white/90 group-hover:ring-rose-200/90">
                <AvatarImage 
                  src="/lovable-uploads/082875b7-798c-40c6-a25d-0f0a86b3441f.png" 
                  alt="In Memory of My Beloved Mother" 
                  className="object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-105 saturate-105 group-hover:saturate-115"
                />
                <AvatarFallback className="bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 text-rose-500 text-2xl">
                  ♥
                </AvatarFallback>
              </Avatar>
              
              {/* Elegant memorial badge */}
              <div className="mt-2 text-[9px] font-semibold text-center text-white bg-gradient-to-r from-rose-500/95 via-pink-500/95 to-purple-500/95 rounded-full px-2 py-1 shadow-lg backdrop-blur-sm border border-rose-200/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.6)]">
                <span className="drop-shadow-sm tracking-wide">In Loving Memory</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gradient-to-br from-white/99 via-rose-25/98 to-pink-50/99 backdrop-blur-xl border-2 border-rose-200/60 shadow-[0_0_25px_rgba(244,114,182,0.4)] p-4 max-w-[270px] rounded-xl ring-1 ring-rose-100/50">
            <div className="text-center space-y-3">
              {/* Elegant top decoration */}
              <div className="flex justify-center items-center space-x-2 mb-3">
                <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-pink-400 animate-pulse"></div>
                <span className="text-rose-400 text-base animate-pulse">♥</span>
                <div className="w-6 h-0.5 bg-gradient-to-r from-pink-400 via-rose-400 to-transparent animate-pulse"></div>
              </div>
              
              <div className="space-y-2">
                <p className="text-base text-gray-800 font-bold tracking-wide bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                  In Eternal Memory
                </p>
                <p className="text-sm text-rose-800/95 font-semibold">
                  My Beloved Mother
                </p>
                <p className="text-xs text-pink-700/80 leading-relaxed">
                  Two years have passed, but your love remains my guiding light
                </p>
              </div>
              
              {/* Heart decoration */}
              <div className="py-2">
                <div className="flex justify-center items-center space-x-1">
                  <span className="text-rose-400 text-sm animate-pulse">♥</span>
                  <span className="text-pink-500 text-lg animate-pulse" style={{animationDelay: '0.5s'}}>♥</span>
                  <span className="text-rose-400 text-sm animate-pulse" style={{animationDelay: '1s'}}>♥</span>
                </div>
              </div>
              
              {/* Bottom decoration */}
              <div className="flex justify-center items-center space-x-2 mt-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent animate-pulse"></div>
              </div>
              
              <div className="text-xs text-rose-600/75 italic font-light">
                Forever in my heart
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Memorial;
