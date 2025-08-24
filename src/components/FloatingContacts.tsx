import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

const FloatingContacts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ADMIN_WHATSAPP_NUMBER = "9876543210"; // Replace with actual number

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
    <>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.3; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        
        @keyframes fireRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes flameDance {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-2px) scaleY(1.2); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes phoneShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        
        .ring-animation {
          animation: ringPulse 2s infinite;
        }
        
        .fire-rotate {
          animation: fireRotate 4s linear infinite;
        }
        
        .flame-dance {
          animation: flameDance 1.5s ease-in-out infinite;
        }
        
        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .phone-shake {
          animation: phoneShake 0.5s ease-in-out infinite;
        }
        
        .gradient-fire {
          background: conic-gradient(from 0deg, #ff4500, #ff6347, #ffd700, #ff8c00, #ff4500);
        }
        
        .gradient-fire-inner {
          background: radial-gradient(circle, #ffd700 0%, #ff6347 50%, #ff4500 100%);
        }
        
        .contact-card-enter {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>

      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 flex flex-col items-end gap-3">
        {/* Contact Options - Show when open */}
        <div className={`transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        } flex flex-col gap-3 mb-3`}>
          
          {/* Contact Info Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-5 border border-gray-100 min-w-[220px] contact-card-enter backdrop-blur-sm">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <Phone className="w-5 h-5 text-blue-600 phone-shake mr-2" />
                <h3 className="text-sm font-bold text-gray-800">Contact Us Now</h3>
              </div>
              <p className="text-xs text-gray-600 font-medium">+91 {ADMIN_WHATSAPP_NUMBER}</p>
              <p className="text-xs text-green-600 mt-1">Available 24/7</p>
            </div>
            
            <div className="flex gap-3 justify-center">
              {/* WhatsApp Button with enhanced styling */}
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl py-3 px-4 transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 shadow-md relative overflow-hidden group"
                title="Chat on WhatsApp"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                <MessageCircle className="w-4 h-4 relative z-10" />
                <span className="text-xs font-medium relative z-10">WhatsApp</span>
              </button>

              {/* Phone Button with enhanced styling */}
              <button
                onClick={handlePhoneClick}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 px-4 transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 shadow-md relative overflow-hidden group"
                title="Call directly"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                <Phone className="w-4 h-4 relative z-10 phone-shake" />
                <span className="text-xs font-medium relative z-10">Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Toggle Button with Fireball and Ring Effects */}
        <div className="relative">
          {/* Ringing circles */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-400 ring-animation"></div>
          <div className="absolute inset-0 rounded-full border-4 border-red-400 ring-animation" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400 ring-animation" style={{ animationDelay: '1s' }}></div>
          
          <button
            onClick={toggleContacts}
            className="w-20 h-20 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative overflow-hidden group"
            title={isOpen ? "Close contacts" : "Contact us"}
          >
            {isOpen ? (
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-700 rounded-full opacity-80"></div>
                <X className="w-8 h-8 transition-transform duration-200 relative z-10" />
              </div>
            ) : (
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                {/* Enhanced multi-layer fireball */}
                <div className="absolute inset-0 gradient-fire rounded-full fire-rotate opacity-90"></div>
                
                <div className="absolute inset-0.5 bg-gradient-conic from-yellow-300 via-orange-500 via-red-600 to-yellow-300 rounded-full opacity-80 fire-rotate" 
                     style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
                
                <div className="absolute inset-1 gradient-fire-inner rounded-full opacity-90 flame-dance"></div>
                
                {/* Pulsing inner core */}
                <div className="absolute inset-2 bg-gradient-radial from-white via-yellow-200 to-orange-300 rounded-full animate-ping opacity-70"></div>
                
                {/* Main icon with glow */}
                <div className="absolute inset-3 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-orange-800 phone-shake" />
                </div>
                
                {/* Enhanced fire particles with sparkle effect */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-radial from-yellow-300 to-orange-500 rounded-full sparkle opacity-90" 
                     style={{ animationDelay: '0s' }}></div>
                
                <div className="absolute -top-2 right-1 w-3 h-3 bg-gradient-radial from-white to-yellow-400 rounded-full sparkle opacity-95"
                     style={{ animationDelay: '0.3s' }}></div>
                
                <div className="absolute top-1 -right-4 w-4 h-4 bg-gradient-radial from-orange-300 to-red-500 rounded-full sparkle opacity-80"
                     style={{ animationDelay: '0.6s' }}></div>
                
                <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-radial from-red-400 to-orange-600 rounded-full sparkle opacity-75" 
                     style={{ animationDelay: '0.9s' }}></div>
                
                <div className="absolute bottom-0 -left-2 w-3 h-3 bg-gradient-radial from-yellow-200 to-red-400 rounded-full sparkle opacity-85"
                     style={{ animationDelay: '1.2s' }}></div>
                
                <div className="absolute -bottom-2 left-4 w-2 h-2 bg-gradient-radial from-white to-orange-400 rounded-full sparkle opacity-90"
                     style={{ animationDelay: '1.5s' }}></div>
                
                <div className="absolute top-2 -left-4 w-4 h-4 bg-gradient-radial from-yellow-400 to-red-500 rounded-full sparkle opacity-70"
                     style={{ animationDelay: '0.4s' }}></div>
                
                <div className="absolute top-6 -left-3 w-2 h-2 bg-gradient-radial from-orange-200 to-red-600 rounded-full sparkle opacity-80"
                     style={{ animationDelay: '1.8s' }}></div>
                
                {/* Enhanced flame trails */}
                <div className="absolute -top-4 left-2 w-2 h-6 bg-gradient-to-t from-transparent via-orange-400 to-yellow-300 opacity-70 flame-dance rounded-full"
                     style={{ animationDelay: '0.2s' }}></div>
                
                <div className="absolute -right-5 top-4 w-6 h-2 bg-gradient-to-r from-transparent via-red-400 to-orange-300 opacity-60 flame-dance rounded-full"
                     style={{ animationDelay: '0.7s' }}></div>
                
                <div className="absolute -bottom-4 right-2 w-2 h-5 bg-gradient-to-b from-transparent via-yellow-400 to-red-400 opacity-65 flame-dance rounded-full"
                     style={{ animationDelay: '1.1s' }}></div>
                
                <div className="absolute -left-5 bottom-3 w-5 h-2 bg-gradient-to-l from-transparent via-orange-500 to-yellow-400 opacity-75 flame-dance rounded-full"
                     style={{ animationDelay: '1.4s' }}></div>
                
                {/* Outer flame aura with enhanced glow */}
                <div className="absolute -inset-4 bg-gradient-radial from-transparent via-orange-400/30 to-transparent rounded-full animate-pulse opacity-60 scale-150"
                     style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                
                <div className="absolute -inset-6 bg-gradient-radial from-transparent via-yellow-300/20 to-transparent rounded-full animate-ping opacity-40"
                     style={{ animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                
                {/* Heat shimmer effect */}
                <div className="absolute -inset-2 bg-gradient-conic from-transparent via-yellow-300/15 via-transparent via-red-300/15 to-transparent rounded-full opacity-40 fire-rotate"
                     style={{ animationDirection: 'reverse', animationDuration: '8s' }}></div>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingContacts;
