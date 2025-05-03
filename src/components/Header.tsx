
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ADMIN_WHATSAPP_NUMBER } from '@/lib/utils';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { translate, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <div className={`w-10 h-10 rounded-full ${isScrolled ? 'bg-primary' : 'bg-white/20 backdrop-blur-sm'} flex items-center justify-center transition-colors duration-300`}>
            <span className={`${isScrolled ? 'text-white' : 'text-white'} font-bold text-lg`}>R</span>
          </div>
          <h1 className={`text-xl md:text-2xl font-bold ${isScrolled ? 'text-cricket-dark' : 'text-white'} hidden sm:block transition-colors duration-300`}>
            {translate('hero_title')}
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          {['home', 'booking', 'pricing', 'contact', 'location'].map((section) => (
            <button 
              key={section}
              onClick={() => scrollToSection(section)} 
              className={`${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/80 hover:text-white'
              } font-medium relative group transition-colors duration-300`}
            >
              {translate(section)}
              <span className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          ))}
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button
            variant={isScrolled ? "outline" : "secondary"}
            size="sm"
            onClick={toggleLanguage}
            className={`text-xs md:text-sm ${!isScrolled && 'border-white/30 text-white bg-white/10 hover:bg-white/20'} transition-colors duration-300`}
          >
            {language === 'english' ? 'తెలుగు' : 'English'}
          </Button>
          
          <Button
            size="sm"
            className={`${
              isScrolled ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white text-cricket-dark hover:bg-white/90'
            } hidden md:flex transition-colors duration-300`}
            onClick={() => {
              window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`, '_blank');
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {translate('contact_now')}
          </Button>

          <Button
            size="sm"
            className={`${
              isScrolled ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white text-cricket-dark hover:bg-white/90'
            } hidden md:flex transition-colors duration-300`}
            onClick={() => scrollToSection('booking')}
          >
            {translate('book_now')}
          </Button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant={isScrolled ? "ghost" : "secondary"}
              size="sm"
              className={`p-1 ${!isScrolled && 'text-white bg-white/10 hover:bg-white/20'}`}
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div id="mobile-menu" className="md:hidden hidden pt-2 pb-4 px-4 bg-white border-t">
        <div className="flex flex-col space-y-3">
          {['home', 'booking', 'pricing', 'contact', 'location'].map((section) => (
            <button 
              key={section}
              onClick={() => {
                scrollToSection(section);
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }} 
              className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md flex items-center justify-between"
            >
              {translate(section)}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
