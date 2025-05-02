
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const { translate } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="h-[40vh] md:h-full bg-cover bg-center" 
               style={{ backgroundImage: "url('/lovable-uploads/83709458-31e8-4d85-8a93-a10a558a1a98.png')" }}>
          </div>
          <div className="h-[40vh] md:h-full bg-cover bg-center hidden md:block" 
               style={{ backgroundImage: "url('/lovable-uploads/9ad475e0-fd2d-4163-8a9d-8a3841ed7db7.png')" }}>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center md:text-left md:ml-12 lg:ml-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {translate('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            {translate('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              onClick={() => scrollToSection('booking')}
            >
              {translate('book_now')}
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/30 text-white px-8 py-6 text-lg"
              onClick={() => scrollToSection('pricing')}
            >
              {translate('view_slots')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
