import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CirclePlay } from 'lucide-react';
import { cn } from '@/lib/utils';
const GroundGallery: React.FC = () => {
  const {
    translate
  } = useLanguage();

  // Gallery images with the newly uploaded images
  const galleryImages = [{
    src: '/lovable-uploads/fa905360-1f15-41a2-a735-8717be438e39.png',
    alt: 'Night cricket ground with yellow stumps and bat'
  }, {
    src: '/lovable-uploads/89ee2646-bf20-46b4-9ff1-1576451d43f1.png',
    alt: 'Day time cricket ground with yellow stumps'
  }, {
    src: '/lovable-uploads/d1793b94-34d0-4c7c-a44d-a22b2fbafb01.png',
    alt: 'Cricket ground with bat and ball closeup'
  }, {
    src: '/lovable-uploads/8911d801-ca01-46c9-994b-49ffb4ea0c4d.png',
    alt: 'Night cricket ground with yellow stumps and a bat'
  }, {
    src: '/lovable-uploads/31637c3f-4ddb-4ecb-aa61-689aac331a11.png',
    alt: 'Day time cricket ground with yellow stumps'
  }];

  // Auto-rotate carousel
  const [api, setApi] = React.useState<any>();
  useEffect(() => {
    if (!api) return;

    // Start autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => {
      clearInterval(autoplayInterval);
    };
  }, [api]);
  return;
};
export default GroundGallery;