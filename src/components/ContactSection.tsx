
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { translate } = useLanguage();
  const phoneNumber = '8919878315';

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{translate('contact_title')}</h2>
          <p className="text-xl text-gray-600">{translate('contact_subtitle')}</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{translate('phone')}</h3>
                <p className="text-lg text-gray-600">{phoneNumber}</p>
                <Button 
                  onClick={handlePhoneClick}
                  className="bg-primary hover:bg-primary/90 text-white w-full"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {translate('phone')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{translate('whatsapp')}</h3>
                <p className="text-lg text-gray-600">{phoneNumber}</p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    <path d="M14.5 17.5 C 14 18, 13.5 20, 16.5 21 C 19.5 22, 20.5 20, 21 19.5"></path>
                  </svg>
                  {translate('whatsapp')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
