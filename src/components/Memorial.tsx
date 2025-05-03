
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Memorial: React.FC = () => {
  return (
    <div className="fixed top-4 left-5 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer transition-all duration-300 hover:scale-110">
              <Avatar className="w-12 h-12 border-2 border-white/70 shadow-md">
                <AvatarImage 
                  src="/lovable-uploads/082875b7-798c-40c6-a25d-0f0a86b3441f.png" 
                  alt="In Loving Memory" 
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/20 text-primary">❤️</AvatarFallback>
              </Avatar>
              <div className="mt-1 text-[8px] font-medium text-center text-white bg-primary/80 rounded-full px-2 shadow-sm backdrop-blur-sm">
                In Memory
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-white/90 backdrop-blur-sm border border-primary/30 shadow-xl p-4 max-w-[200px]">
            <div className="text-center">
              <p className="text-sm text-gray-800 font-medium">In Loving Memory</p>
              <p className="text-xs text-gray-600 mt-1">Forever in our hearts</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Memorial;
