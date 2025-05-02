
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { translate, language, toggleLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-cricket-dark hidden sm:block">
            {translate('hero_title')}
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-gray-700 hover:text-primary font-medium"
          >
            {translate('home')}
          </button>
          <button 
            onClick={() => scrollToSection('booking')} 
            className="text-gray-700 hover:text-primary font-medium"
          >
            {translate('book')}
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="text-gray-700 hover:text-primary font-medium"
          >
            {translate('pricing')}
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-gray-700 hover:text-primary font-medium"
          >
            {translate('contact')}
          </button>
          <button 
            onClick={() => scrollToSection('location')} 
            className="text-gray-700 hover:text-primary font-medium"
          >
            {translate('location')}
          </button>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="text-xs md:text-sm"
          >
            {language === 'english' ? 'తెలుగు' : 'English'}
          </Button>
          
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white hidden md:flex"
            onClick={() => scrollToSection('booking')}
          >
            {translate('book_now')}
          </Button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="p-1"
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
          <button 
            onClick={() => {
              scrollToSection('home');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }} 
            className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md"
          >
            {translate('home')}
          </button>
          <button 
            onClick={() => {
              scrollToSection('booking');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }} 
            className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md"
          >
            {translate('book')}
          </button>
          <button 
            onClick={() => {
              scrollToSection('pricing');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }} 
            className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md"
          >
            {translate('pricing')}
          </button>
          <button 
            onClick={() => {
              scrollToSection('contact');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }} 
            className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md"
          >
            {translate('contact')}
          </button>
          <button 
            onClick={() => {
              scrollToSection('location');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }} 
            className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md"
          >
            {translate('location')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
