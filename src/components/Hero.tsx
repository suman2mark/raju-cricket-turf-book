
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({
  scrollToSection
}) => {
  const {
    translate
  } = useLanguage();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="h-[40vh] md:h-full bg-cover bg-center" style={{
            backgroundImage: "url('/lovable-uploads/8911d801-ca01-46c9-994b-49ffb4ea0c4d.png')"
          }}>
          </div>
          <div className="h-[40vh] md:h-full bg-cover bg-center hidden md:block" style={{
            backgroundImage: "url('/lovable-uploads/31637c3f-4ddb-4ecb-aa61-689aac331a11.png')"
          }}>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent rounded-none bg-rose-950"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center md:text-left md:ml-12 lg:ml-20">
        <div className="max-w-3xl">
          <div className="inline-block bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-bounce-slow">
            <span className="text-white font-semibold">{translate('new_facility') || 'Premium Cricket Experience'}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {translate('hero_title')}
          </h1>
          
          <div className="w-20 h-1 bg-primary my-6 mx-auto md:mx-0"></div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            {translate('hero_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group relative overflow-hidden" onClick={() => scrollToSection('booking')}>
              <span className="relative z-10 flex items-center">
                {translate('book_now')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
            
            <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/30 text-white px-8 py-6 text-lg group" onClick={() => scrollToSection('pricing')}>
              <span className="relative z-10">{translate('view_slots')}</span>
              <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center md:justify-start space-x-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-white">6</div>
              <div className="w-10 h-10 rounded-full bg-cricket-stumps flex items-center justify-center text-cricket-dark font-bold border-2 border-white">4</div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-cricket-dark font-bold border-2 border-white">W</div>
            </div>
            
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <button onClick={() => scrollToSection('booking')} className="text-white/80 hover:text-white flex flex-col items-center">
          <span className="mb-2">{translate('scroll_down') || 'Scroll Down'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
