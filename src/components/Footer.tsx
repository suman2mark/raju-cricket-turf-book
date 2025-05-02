
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const { translate } = useLanguage();
  
  return (
    <footer className="bg-cricket-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Raju Sixer Adda</h3>
            <p className="text-gray-300">
              {translate('hero_subtitle')}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{translate('pricing_title')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{translate('daytime_rate')}</li>
              <li>{translate('nighttime_rate')}</li>
              <li>{translate('tournament_rate')}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{translate('contact_title')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{translate('phone')}: 8919878315</li>
              <li>{translate('whatsapp')}: 8919878315</li>
              <li>UPI: 8919878315@ybl</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {translate('copyright')}
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {translate('home')}
            </button>
            <button 
              onClick={() => scrollToSection('booking')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {translate('book')}
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {translate('pricing')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {translate('contact')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
