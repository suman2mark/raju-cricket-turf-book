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
    <div className="fixed right-4 bottom-20 z-50 flex flex-col items-center gap-3">
      <TooltipProvider>
        {/* Contact Options - Show when open */}
        <div className={`transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
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
              className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative overflow-hidden group"
              aria-label={isOpen ? "Close contacts" : "Open contacts"}
            >
              {isOpen ? (
                <div className="w-14 h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 transition-transform duration-200" />
                </div>
              ) : (
                <img 
                  src="/lovable-uploads/225b815b-f9d5-4202-b424-a8e4aebc0fa3.png" 
                  alt="Contact us" 
                  className="w-14 h-14 rounded-full transition-transform duration-200 hover:scale-110"
                />
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