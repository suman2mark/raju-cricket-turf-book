import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, MessageSquare, X, Move } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ADMIN_WHATSAPP_NUMBER } from '@/lib/utils';

const FloatingContacts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 120, y: 50 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Get viewport dimensions for boundary checking
        const maxX = window.innerWidth - 300; // Account for expanded width
        const maxY = window.innerHeight - 100;
        
        // Apply boundary constraints
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));
        
        setPosition({ x: constrainedX, y: constrainedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:+91${ADMIN_WHATSAPP_NUMBER}`, '_self');
  };

  const toggleContacts = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      ref={widgetRef}
      className={`fixed flex flex-col items-end gap-3 select-none ${
        isDragging ? 'z-[9999] scale-105' : 'z-50'
      }`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        filter: isDragging ? 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.25))' : 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))',
        transition: isDragging ? 'none' : 'all 0.3s ease-out'
      }}
    >
      <TooltipProvider>
        {/* Contact Options - Show when open */}
        <div className={`transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 translate-x-0 scale-100 max-h-96' : 'opacity-0 translate-x-4 scale-95 pointer-events-none max-h-0 overflow-hidden'
        } flex flex-col gap-3 mb-3`}>
          
          {/* Contact Info Card */}
          <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 min-w-[200px] transition-all duration-500 ${
            isOpen ? 'p-4 opacity-100' : 'p-0 opacity-0'
          }`}>
            <div className={`text-center mb-3 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className="text-sm font-bold text-gray-800">Contact Us</h3>
              <p className="text-xs text-gray-600">+91 {ADMIN_WHATSAPP_NUMBER}</p>
            </div>
            
            <div className={`flex gap-2 justify-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              {/* WhatsApp Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppClick();
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-md transform"
                    aria-label="Contact via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">WhatsApp</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p className="text-sm">Chat on WhatsApp</p>
                </TooltipContent>
              </Tooltip>

              {/* Phone Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePhoneClick();
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-md transform"
                    aria-label="Call us"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-medium">Call</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p className="text-sm">Call directly</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Toggle Button - Draggable Handle */}
        <div 
          className={`relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) {
                    toggleContacts();
                  }
                }}
                className={`rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative overflow-hidden group ${
                  isOpen ? 'w-20 h-20' : 'w-16 h-16'
                }`}
                aria-label={isOpen ? "Close contacts" : "Open contacts"}
                style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
              >
                {/* Drag indicator */}
                {isDragging && (
                  <div className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1 shadow-md">
                    <Move className="w-3 h-3 text-gray-600" />
                  </div>
                )}
                
                {isOpen ? (
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300">
                    <X className="w-8 h-8 transition-transform duration-300 hover:rotate-90" />
                  </div>
                ) : (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden transition-all duration-300">
                    {/* Fireball animation background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-1 bg-gradient-to-r from-yellow-400 via-red-400 to-orange-500 rounded-full animate-bounce-slow opacity-80"></div>
                    
                    {/* Icon image */}
                    <img 
                      src="/lovable-uploads/225b815b-f9d5-4202-b424-a8e4aebc0fa3.png" 
                      alt="Contact us" 
                      className="relative w-16 h-16 rounded-full transition-transform duration-300 hover:scale-105 z-10"
                      draggable={false}
                    />
                    
                    {/* Fire particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping opacity-40 animation-delay-200"></div>
                    <div className="absolute top-1 -left-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-50 animation-delay-400"></div>
                  </div>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-sm">{isDragging ? 'Dragging widget...' : isOpen ? 'Close contacts' : 'Drag to move • Click to contact'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default FloatingContacts;