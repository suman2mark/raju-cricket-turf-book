import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
const GroundGallery: React.FC = () => {
  const {
    translate
  } = useLanguage();

  // Gallery images with cricket ground scenes
  const galleryImages = [{
    src: '/lovable-uploads/peddi4.gif',
    alt: 'Hit Hard, Play Smart!',
    caption: translate('book_your_game') || 'Book Your Game Now'
  }, {
    src: '/lovable-uploads/peddi3.gif',
    alt: 'Fast. Fierce. Fun.',
    caption: translate('Unbox the Cricket Fever!') || 'Smash It at Raju Sixer Adda'
  }, {
    src: '/lovable-uploads/box4.jpg',
    alt: 'Smash It in the Box!',
    caption: translate('smash_it') || 'Premium Cricket Experience'
  }];

  // Auto-rotate carousel
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  useEffect(() => {
    if (!api) return;

    // Update current slide indicator
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);

    // Start autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => {
      api.off("select", onSelect);
      clearInterval(autoplayInterval);
    };
  }, [api]);
  return;
};
export default GroundGallery;