import React, { useState } from 'react';
import { Phone, MessageCircle, MessageSquare, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ADMIN_WHATSAPP_NUMBER } from '@/lib/utils';

const FloatingContacts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 flex flex-col items-end gap-3">
      <TooltipProvider>
        {/* Contact Options - Show when open */}
        <div className={`transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        } flex flex-col gap-3 mb-3`}>
          
          {/* Contact Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 min-w-[200px] animate-fade-in">
            <div className="text-center mb-3">
              <h3 className="text-sm font-bold text-gray-800">Contact Us</h3>
              <p className="text-xs text-gray-600">+91 {ADMIN_WHATSAPP_NUMBER}</p>
            </div>
            
            <div className="flex gap-2 justify-center">
              {/* WhatsApp Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 px-4 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-md"
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
                    onClick={handlePhoneClick}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 px-4 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-md"
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

        {/* Toggle Button with Enhanced Fireball Effects */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleContacts}
              className="w-20 h-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative overflow-hidden group"
              aria-label={isOpen ? "Close contacts" : "Open contacts"}
            >
              {isOpen ? (
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center">
                  <X className="w-8 h-8 transition-transform duration-200" />
                </div>
              ) : (
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  {/* Multi-layer fireball core */}
                  <div className="absolute inset-0 bg-gradient-conic from-orange-500 via-red-500 via-yellow-400 via-orange-600 to-red-400 rounded-full animate-spin opacity-90" 
                       style={{ animation: 'spin 4s linear infinite' }}></div>
                  
                  <div className="absolute inset-0.5 bg-gradient-radial from-yellow-300 via-orange-500 to-red-600 rounded-full animate-pulse opacity-80"></div>
                  
                  <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 via-orange-400 to-red-500 rounded-full opacity-70"
                       style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                  
                  {/* Inner fire core */}
                  <div className="absolute inset-2 bg-gradient-radial from-white via-yellow-200 to-orange-300 rounded-full animate-ping opacity-60"></div>
                  
                  {/* Icon image with fire glow */}
                  <img 
                    src="/lovable-uploads/225b815b-f9d5-4202-b424-a8e4aebc0fa3.png" 
                    alt="Contact us" 
                    className="relative w-20 h-20 rounded-full transition-transform duration-200 hover:scale-105 z-10"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.8))' }}
                  />
                  
                  {/* Enhanced fire particles with different sizes and colors */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-radial from-yellow-300 to-orange-500 rounded-full animate-ping opacity-80" 
                       style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                  
                  <div className="absolute -top-1 right-1 w-2 h-2 bg-gradient-radial from-white to-yellow-400 rounded-full animate-bounce opacity-90"
                       style={{ animationDelay: '0.3s', animation: 'bounce 2s infinite' }}></div>
                  
                  <div className="absolute top-2 -right-3 w-3 h-3 bg-gradient-radial from-orange-300 to-red-500 rounded-full animate-pulse opacity-70"
                       style={{ animationDelay: '0.6s' }}></div>
                  
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-radial from-red-400 to-orange-600 rounded-full animate-ping opacity-60" 
                       style={{ animationDelay: '0.8s' }}></div>
                  
                  <div className="absolute bottom-1 -left-1 w-2 h-2 bg-gradient-radial from-yellow-200 to-red-400 rounded-full animate-bounce opacity-75"
                       style={{ animationDelay: '1.2s' }}></div>
                  
                  <div className="absolute -bottom-1 left-3 w-1.5 h-1.5 bg-gradient-radial from-white to-orange-400 rounded-full animate-ping opacity-80"
                       style={{ animationDelay: '1.5s' }}></div>
                  
                  <div className="absolute top-0 -left-3 w-2.5 h-2.5 bg-gradient-radial from-yellow-300 to-red-400 rounded-full animate-pulse opacity-65"
                       style={{ animationDelay: '0.4s' }}></div>
                  
                  <div className="absolute top-4 -left-2 w-1.5 h-1.5 bg-gradient-radial from-orange-200 to-red-500 rounded-full animate-bounce opacity-70"
                       style={{ animationDelay: '1.8s' }}></div>
                  
                  {/* Fire trail effects */}
                  <div className="absolute -top-3 left-2 w-1 h-3 bg-gradient-to-t from-transparent via-orange-400 to-yellow-300 opacity-60 animate-pulse rounded-full"
                       style={{ animationDelay: '0.2s' }}></div>
                  
                  <div className="absolute -right-4 top-3 w-3 h-1 bg-gradient-to-r from-transparent via-red-400 to-orange-300 opacity-50 animate-ping rounded-full"
                       style={{ animationDelay: '0.7s' }}></div>
                  
                  <div className="absolute -bottom-3 right-1 w-1 h-2 bg-gradient-to-b from-transparent via-yellow-400 to-red-400 opacity-55 animate-bounce rounded-full"
                       style={{ animationDelay: '1.1s' }}></div>
                  
                  <div className="absolute -left-4 bottom-2 w-2 h-1 bg-gradient-to-l from-transparent via-orange-500 to-yellow-400 opacity-65 animate-pulse rounded-full"
                       style={{ animationDelay: '1.4s' }}></div>
                  
                  {/* Outer flame aura */}
                  <div className="absolute -inset-2 bg-gradient-radial from-transparent via-orange-400/20 to-transparent rounded-full animate-pulse opacity-40 scale-150"
                       style={{ animation: 'pulse 3s ease-in-out infinite' }}></div>
                  
                  {/* Heat shimmer effect */}
                  <div className="absolute -inset-1 bg-gradient-conic from-transparent via-yellow-300/10 via-transparent via-red-300/10 to-transparent rounded-full opacity-30"
                       style={{ animation: 'spin 6s linear infinite reverse' }}></div>
                </div>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-sm">{isOpen ? 'Close contacts' : 'Contact us'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FloatingContacts;
