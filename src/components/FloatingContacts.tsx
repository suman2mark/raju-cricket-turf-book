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
        .ring-animation { animation: ringPulse 2.5s infinite; }
        .fire-rotate { animation: fireRotate 5s linear infinite; }
        .flame-dance { animation: flameDance 2s ease-in-out infinite; }
        .sparkle { animation: sparkle 2.5s ease-in-out infinite; }
        .phone-shake { animation: phoneShake 1s ease-in-out infinite; }
        .green-glow { animation: greenGlow 2s ease-in-out infinite; }
        .leaf-float { animation: leafFloat 3s ease-in-out infinite; }
        .gradient-fire { background: conic-gradient(from 0deg, #22c55e, #16a34a, #84cc16, #65a30d, #15803d, #22c55e); }
        .gradient-fire-inner { background: radial-gradient(circle, #a3e635 0%, #22c55e 30%, #16a34a 70%, #15803d 100%); }
        .gradient-emerald { background: linear-gradient(135deg, #10b981, #059669, #047857); }
        .contact-card-enter { animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px) scale(0.8) rotateY(15deg); }
          to { opacity: 1; transform: translateX(0) scale(1) rotateY(0deg); }
        }
        .cricket-pattern {
          background-image: radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.3) 1px, transparent 0);
          background-size: 10px 10px;
        }
      `}</style>

      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 flex flex-col items-end gap-3">
        {/* Contact Options */}
        <div className={`transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        } flex flex-col gap-3 mb-3`}>
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-2xl p-5 border-2 border-green-100 min-w-[240px] contact-card-enter backdrop-blur-sm cricket-pattern relative overflow-hidden">
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
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 shadow-lg relative overflow-hidden group transform hover:-translate-y-1"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 relative z-10 leaf-float" />
                <span className="text-xs font-bold relative z-10">WhatsApp</span>
              </button>
              <button
                onClick={handlePhoneClick}
                className="flex-1 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700 text-white rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 shadow-lg relative overflow-hidden group transform hover:-translate-y-1"
                title="Call directly"
              >
                <Phone className="w-4 h-4 relative z-10 phone-shake" />
                <span className="text-xs font-bold relative z-10">Call Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Smaller Toggle Button */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-3 border-green-400 ring-animation"></div>
          <div className="absolute inset-0 rounded-full border-3 border-emerald-400 ring-animation" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full border-3 border-lime-400 ring-animation" style={{ animationDelay: '1s' }}></div>
          
          <button
            onClick={toggleContacts}
            className="w-12 h-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center relative overflow-hidden group"
            title={isOpen ? "Close contacts" : "Contact us"}
          >
            {isOpen ? (
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center relative">
                <X className="w-5 h-5 transition-transform duration-200 relative z-10" />
              </div>
            ) : (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <div className="absolute inset-0 gradient-fire rounded-full fire-rotate opacity-90"></div>
                <div className="absolute inset-0.5 bg-gradient-conic from-lime-300 via-green-500 via-emerald-600 to-lime-300 rounded-full opacity-80 fire-rotate"
                     style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
                <div className="absolute inset-1 gradient-fire-inner rounded-full opacity-90 flame-dance"></div>
                <div className="absolute inset-2 bg-gradient-radial from-white via-lime-200 to-green-300 rounded-full animate-ping opacity-70"></div>
                <div className="absolute inset-2.5 bg-gradient-to-br from-lime-100 to-green-200 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-800 phone-shake" />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingContacts;
