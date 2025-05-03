import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
const GroundGallery: React.FC = () => {
  const {
    translate
  } = useLanguage();
  const galleryImages = [{
    src: '/lovable-uploads/8911d801-ca01-46c9-994b-49ffb4ea0c4d.png',
    alt: 'Night cricket ground with yellow stumps and a bat'
  }, {
    src: '/lovable-uploads/31637c3f-4ddb-4ecb-aa61-689aac331a11.png',
    alt: 'Day time cricket ground with yellow stumps'
  }];
  return <section id="gallery" className="py-16 bg-gradient-to-b from-white to-gray-50">
      
    </section>;
};
export default GroundGallery;