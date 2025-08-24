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

        {/* Toggle Button */}
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
                  {/* Fireball animation background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-1 bg-gradient-to-r from-yellow-400 via-red-400 to-orange-500 rounded-full animate-bounce-slow opacity-80"></div>
                  
                  {/* Icon image */}
                  <img 
                    src="/lovable-uploads/225b815b-f9d5-4202-b424-a8e4aebc0fa3.png" 
                    alt="Contact us" 
                    className="relative w-20 h-20 rounded-full transition-transform duration-200 hover:scale-105 z-10"
                  />
                  
                  {/* Fire particles */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-40 animation-delay-200"></div>
                  <div className="absolute top-1 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-50 animation-delay-400"></div>
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