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
    <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-4">
      <TooltipProvider>
        {/* WhatsApp Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleWhatsAppClick}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-pulse hover:animate-none relative overflow-hidden"
              aria-label="Contact via WhatsApp"
              style={{
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-ping opacity-20"></div>
              <MessageCircle className="w-7 h-7 relative z-10" />
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
              className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-pulse hover:animate-none relative overflow-hidden"
              aria-label="Call us"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-ping opacity-20"></div>
              <Phone className="w-7 h-7 relative z-10" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-white/90 backdrop-blur-sm border border-blue-500/30 shadow-xl">
            <p className="text-sm font-medium">Call Now</p>
            <p className="text-xs text-gray-600">+91 {ADMIN_WHATSAPP_NUMBER}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Contact Info Badge */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 mt-2 border border-gray-200 animate-fade-in">
        <p className="text-xs font-semibold text-gray-800 text-center">Quick Contact</p>
        <p className="text-xs text-gray-600 text-center font-medium">+91 {ADMIN_WHATSAPP_NUMBER}</p>
      </div>
    </div>
  );
};

export default FloatingContacts;