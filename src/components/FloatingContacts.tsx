import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

const FloatingContacts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ADMIN_WHATSAPP_NUMBER = "9701399366";

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
          0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { transform: scale(1.3); opacity: 0.5; box-shadow: 0 0 0 10px rgba(34, 197, 94, 0.3); }
          100% { transform: scale(1.6); opacity: 0; box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
        }
        
        @keyframes fireRotate {
          0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
          33% { transform: rotate(120deg) scale(1.05); filter: hue-rotate(10deg); }
          66% { transform: rotate(240deg) scale(0.95); filter: hue-rotate(-10deg); }
          100% { transform: rotate(360deg) scale(1); filter: hue-rotate(0deg); }
        }
        
        @keyframes flameDance {
          0%, 100% { transform: translateY(0) scaleY(1) scaleX(1); opacity: 0.8; }
          25% { transform: translateY(-1px) scaleY(1.1) scaleX(0.9); opacity: 1; }
          50% { transform: translateY(-2px) scaleY(1.3) scaleX(1.1); opacity: 0.9; }
          75% { transform: translateY(-1px) scaleY(1.2) scaleX(0.95); opacity: 1; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          25% { opacity: 0.6; transform: scale(0.8) rotate(90deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
          75% { opacity: 0.8; transform: scale(1) rotate(270deg); }
        }
        
        @keyframes phoneShake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          10% { transform: rotate(-2deg) scale(1.05); }
          20% { transform: rotate(2deg) scale(1.1); }
          30% { transform: rotate(-2deg) scale(1.05); }
          40% { transform: rotate(2deg) scale(1); }
          50% { transform: rotate(0deg) scale(1.02); }
          60% { transform: rotate(-1deg) scale(1); }
          70% { transform: rotate(1deg) scale(1.02); }
          80% { transform: rotate(0deg) scale(1); }
        }
        
        @keyframes greenGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5), 0 0 10px rgba(34, 197, 94, 0.3), 0 0 15px rgba(34, 197, 94, 0.2); }
          50% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.5), 0 0 30px rgba(34, 197, 94, 0.3); }
        }
        
        @keyframes leafFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-3px) rotate(5deg); }
          66% { transform: translateY(3px) rotate(-5deg); }
        }
        
        .ring-animation {
          animation: ringPulse 2.5s infinite;
        }
        
        .fire-rotate {
          animation: fireRotate 5s linear infinite;
        }
        
        .flame-dance {
          animation: flameDance 2s ease-in-out infinite;
        }
        
        .sparkle {
          animation: sparkle 2.5s ease-in-out infinite;
        }
        
        .phone-shake {
          animation: phoneShake 1s ease-in-out infinite;
        }
        
        .green-glow {
          animation: greenGlow 2s ease-in-out infinite;
        }
        
        .leaf-float {
          animation: leafFloat 3s ease-in-out infinite;
        }
        
        .gradient-fire {
          background: conic-gradient(from 0deg, #22c55e, #16a34a, #84cc16, #65a30d, #15803d, #22c55e);
        }
        
        .gradient-fire-inner {
          background: radial-gradient(circle, #a3e635 0%, #22c55e 30%, #16a34a 70%, #15803d 100%);
        }
        
        .gradient-emerald {
          background: linear-gradient(135deg, #10b981, #059669, #047857);
        }
        
        .contact-card-enter {
          animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.8) rotateY(15deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1) rotateY(0deg);
          }
        }
        
        .cricket-pattern {
          background-image: radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.3) 1px, transparent 0);
          background-size: 10px 10px;
        }
      `}</style>

      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 flex flex-col items-end gap-3">
        {/* Contact Options - Show when open */}
        <div className={`transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        } flex flex-col gap-3 mb-3`}>
          
          {/* Contact Info Card with enhanced design */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-2xl p-5 border-2 border-green-100 min-w-[240px] contact-card-enter backdrop-blur-sm cricket-pattern relative overflow-hidden">
            {/* Subtle green glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/20 rounded-2xl"></div>
            
            <div className="text-center mb-4 relative z-10">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-green-100 rounded-full p-2 mr-3 green-glow">
                  <Phone className="w-5 h-5 text-green-700 phone-shake" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Contact Us Now</h3>
                  <div className="flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-xs text-green-600 font-semibold">Online Now</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 mb-2">
                <p className="text-sm text-gray-800 font-bold">+91 {ADMIN_WHATSAPP_NUMBER}</p>
              </div>
              <p className="text-xs text-green-600 font-medium">⚡ Instant Response • Available 24/7</p>
            </div>
            
            <div className="flex gap-3 justify-center relative z-10">
              {/* WhatsApp Button with cricket theme */}
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 shadow-lg relative overflow-hidden group transform hover:-translate-y-1"
                title="Chat on WhatsApp"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-green-400/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                <MessageCircle className="w-4 h-4 relative z-10 leaf-float" />
                <span className="text-xs font-bold relative z-10">WhatsApp</span>
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-lime-300 rounded-full animate-bounce opacity-80"></div>
              </button>

              {/* Phone Button with cricket theme */}
              <button
                onClick={handlePhoneClick}
                className="flex-1 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700 text-white rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 shadow-lg relative overflow-hidden group transform hover:-translate-y-1"
                title="Call directly"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-blue-400/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                <Phone className="w-4 h-4 relative z-10 phone-shake" />
                <span className="text-xs font-bold relative z-10">Call Now</span>
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-cyan-300 rounded-full animate-bounce opacity-80"></div>
              </button>
            </div>
            
            {/* Cricket ball decoration */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full opacity-10">
              <div className="absolute inset-1 border-l border-white/30"></div>
              <div className="absolute inset-1 border-r border-white/30"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Toggle Button with Fireball and Ring Effects */}
        <div className="relative">
          {/* Ringing circles */}
          <div className="absolute inset-0 rounded-full border-3 border-green-400 ring-animation"></div>
          <div className="absolute inset-0 rounded-full border-3 border-emerald-400 ring-animation" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full border-3 border-lime-400 ring-animation" style={{ animationDelay: '1s' }}></div>
          
          <button
            onClick={toggleContacts}
            className="w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center relative overflow-hidden group"
            title={isOpen ? "Close contacts" : "Contact us"}
          >
            {isOpen ? (
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-700 rounded-full opacity-80"></div>
                <X className="w-6 h-6 transition-transform duration-200 relative z-10" />
              </div>
            ) : (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                {/* Enhanced multi-layer fireball with green theme */}
                <div className="absolute inset-0 gradient-fire rounded-full fire-rotate opacity-90"></div>
                
                <div className="absolute inset-0.5 bg-gradient-conic from-lime-300 via-green-500 via-emerald-600 to-lime-300 rounded-full opacity-80 fire-rotate" 
                     style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
                
                <div className="absolute inset-1 gradient-fire-inner rounded-full opacity-90 flame-dance"></div>
                
                {/* Pulsing inner core */}
                <div className="absolute inset-2 bg-gradient-radial from-white via-lime-200 to-green-300 rounded-full animate-ping opacity-70"></div>
                
                {/* Main icon with glow */}
                <div className="absolute inset-2.5 bg-gradient-to-br from-lime-100 to-green-200 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-800 phone-shake" />
                </div>
                
                {/* Enhanced fire particles with green sparkle effect */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-radial from-lime-300 to-green-500 rounded-full sparkle opacity-90" 
                     style={{ animationDelay: '0s' }}></div>
                
                <div className="absolute -top-1 right-1 w-2 h-2 bg-gradient-radial from-white to-lime-400 rounded-full sparkle opacity-95"
                     style={{ animationDelay: '0.3s' }}></div>
                
                <div className="absolute top-1 -right-3 w-3 h-3 bg-gradient-radial from-green-300 to-emerald-500 rounded-full sparkle opacity-80"
                     style={{ animationDelay: '0.6s' }}></div>
                
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-radial from-emerald-400 to-green-600 rounded-full sparkle opacity-75" 
                     style={{ animationDelay: '0.9s' }}></div>
                
                <div className="absolute bottom-0 -left-1 w-2 h-2 bg-gradient-radial from-lime-200 to-emerald-400 rounded-full sparkle opacity-85"
                     style={{ animationDelay: '1.2s' }}></div>
                
                <div className="absolute -bottom-1 left-3 w-1.5 h-1.5 bg-gradient-radial from-white to-green-400 rounded-full sparkle opacity-90"
                     style={{ animationDelay: '1.5s' }}></div>
                
                <div className="absolute top-1 -left-3 w-3 h-3 bg-gradient-radial from-lime-400 to-emerald-500 rounded-full sparkle opacity-70"
                     style={{ animationDelay: '0.4s' }}></div>
                
                <div className="absolute top-4 -left-2 w-1.5 h-1.5 bg-gradient-radial from-green-200 to-emerald-600 rounded-full sparkle opacity-80"
                     style={{ animationDelay: '1.8s' }}></div>
                
                {/* Enhanced flame trails in green */}
                <div className="absolute -top-3 left-1 w-1.5 h-4 bg-gradient-to-t from-transparent via-green-400 to-lime-300 opacity-70 flame-dance rounded-full"
                     style={{ animationDelay: '0.2s' }}></div>
                
                <div className="absolute -right-4 top-2 w-4 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-green-300 opacity-60 flame-dance rounded-full"
                     style={{ animationDelay: '0.7s' }}></div>
                
                <div className="absolute -bottom-3 right-1 w-1.5 h-4 bg-gradient-to-b from-transparent via-lime-400 to-emerald-400 opacity-65 flame-dance rounded-full"
                     style={{ animationDelay: '1.1s' }}></div>
                
                <div className="absolute -left-4 bottom-2 w-4 h-1.5 bg-gradient-to-l from-transparent via-green-500 to-lime-400 opacity-75 flame-dance rounded-full"
                     style={{ animationDelay: '1.4s' }}></div>
                
                {/* Outer flame aura with enhanced green glow */}
                <div className="absolute -inset-3 bg-gradient-radial from-transparent via-green-400/30 to-transparent rounded-full animate-pulse opacity-60 scale-150"
                     style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                
                <div className="absolute -inset-4 bg-gradient-radial from-transparent via-lime-300/20 to-transparent rounded-full animate-ping opacity-40"
                     style={{ animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                
                {/* Heat shimmer effect */}
                <div className="absolute -inset-1.5 bg-gradient-conic from-transparent via-lime-300/15 via-transparent via-emerald-300/15 to-transparent rounded-full opacity-40 fire-rotate"
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
