import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ADMIN_WHATSAPP_NUMBER } from '@/lib/utils';

const FloatingContacts: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:+91${ADMIN_WHATSAPP_NUMBER}`, '_self');
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      <TooltipProvider>
        {/* WhatsApp Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleWhatsAppClick}
              className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-white/90 backdrop-blur-sm border border-green-500/30 shadow-xl">
            <p className="text-sm font-medium">WhatsApp Chat</p>
            <p className="text-xs text-gray-600">+91 {ADMIN_WHATSAPP_NUMBER}</p>
          </TooltipContent>
        </Tooltip>

        {/* Phone Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handlePhoneClick}
              className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
              aria-label="Call us"
            >
              <Phone className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-white/90 backdrop-blur-sm border border-blue-500/30 shadow-xl">
            <p className="text-sm font-medium">Call Now</p>
            <p className="text-xs text-gray-600">+91 {ADMIN_WHATSAPP_NUMBER}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Contact Info Badge */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 mt-2 border border-gray-200">
        <p className="text-xs font-medium text-gray-800 text-center">Quick Contact</p>
        <p className="text-xs text-gray-600 text-center">+91 {ADMIN_WHATSAPP_NUMBER}</p>
      </div>
    </div>
  );
};

export default FloatingContacts;