
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin } from 'lucide-react';

const LocationSection: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {translate('location_title')}
          </h2>
          <p className="text-xl text-gray-600">
            {translate('location_subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15166.818807087933!2d83.36890969707005!3d18.131422976209294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bef7175a1630d%3A0x1db596df4bd80da3!2sDwarapudi%2C%20Andhra%20Pradesh%20535003!5e0!3m2!1sen!2sin!4v1746172098769!5m2!1sen!2sin"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Raju Sixer Adda Location"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full">
            </iframe>
          </div>

          <div className="bg-white p-6 rounded-b-lg shadow-lg -mt-2">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Raju Sixer Adda</h3>
                <p className="text-gray-600">Dwarapudi Village, Vizianagaram District, Andhra Pradesh 535003</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
