
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({
  scrollToSection
}) => {
  const { translate } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Banner images with the new uploads
  const bannerImages = [
    '/lovable-uploads/e260a3e2-7dcb-433d-888b-62ed8fc68575.png',
    '/lovable-uploads/61bd8975-1238-441d-bd54-84604dc8e522.png',
    '/lovable-uploads/03e05ff6-50a3-4ad9-b2dd-8cc749c35287.png'
  ];

  // Auto-rotate banner images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [bannerImages.length]);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Full screen banner with sliding images */}
      <div className="absolute inset-0 z-0">
        {bannerImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
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
          
          {/* Slide indicators */}
          <div className="mt-8 flex items-center justify-center md:justify-start space-x-3">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
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
