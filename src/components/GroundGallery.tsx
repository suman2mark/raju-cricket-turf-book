import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
const GroundGallery: React.FC = () => {
  const {
    translate
  } = useLanguage();
  const galleryImages = [{
    src: '/lovable-uploads/a6069148-c1b1-4c4e-9025-39f6a6f9afd8.png',
    alt: 'Night cricket ground with yellow stumps and a bat'
  }, {
    src: '/lovable-uploads/361badd0-5f37-4415-9830-0c639bdfd5cb.png',
    alt: 'Day time cricket ground with yellow stumps'
  }];
  return;
};
export default GroundGallery;