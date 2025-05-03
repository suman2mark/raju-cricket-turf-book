
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CirclePlay } from 'lucide-react';
import { cn } from '@/lib/utils';

const GroundGallery: React.FC = () => {
  const { translate } = useLanguage();
  
  // Gallery images with the newly uploaded images
  const galleryImages = [
    {
      src: '/lovable-uploads/fa905360-1f15-41a2-a735-8717be438e39.png',
      alt: 'Night cricket ground with yellow stumps and bat'
    },
    {
      src: '/lovable-uploads/89ee2646-bf20-46b4-9ff1-1576451d43f1.png',
      alt: 'Day time cricket ground with yellow stumps'
    },
    {
      src: '/lovable-uploads/d1793b94-34d0-4c7c-a44d-a22b2fbafb01.png',
      alt: 'Cricket ground with bat and ball closeup'
    },
    {
      src: '/lovable-uploads/8911d801-ca01-46c9-994b-49ffb4ea0c4d.png',
      alt: 'Night cricket ground with yellow stumps and a bat'
    },
    {
      src: '/lovable-uploads/31637c3f-4ddb-4ecb-aa61-689aac331a11.png',
      alt: 'Day time cricket ground with yellow stumps'
    }
  ];

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

  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{translate('gallery_title') || 'Our Cricket Ground'}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translate('gallery_subtitle') || 'Experience our state-of-the-art cricket facilities designed for the ultimate playing experience'}
          </p>
          <div className="w-20 h-1 bg-primary my-6 mx-auto"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Carousel setApi={setApi} className="w-full" opts={{
            loop: true,
            align: "start",
          }}>
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-2/3 lg:basis-3/4">
                  <div className="p-1">
                    <Card className="rounded-lg overflow-hidden shadow-xl border-none">
                      <div className="relative aspect-video group cursor-pointer">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-primary/80 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <CirclePlay className="text-white h-8 w-8" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-medium">
                          {index === 0 && "Night Cricket Experience"}
                          {index === 1 && "Daytime Practice Sessions"}
                          {index === 2 && "Professional Equipment"}
                          {index === 3 && "Evening Matches Under Lights"}
                          {index === 4 && "Premium Playing Surface"}
                        </h3>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-4 -right-4 top-1/2 flex justify-between -translate-y-1/2 z-10">
              <CarouselPrevious className="relative left-0 bg-white/80 hover:bg-white shadow-lg border-none" />
              <CarouselNext className="relative right-0 bg-white/80 hover:bg-white shadow-lg border-none" />
            </div>
          </Carousel>

          <div className="flex justify-center mt-6 gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  "bg-primary/30 hover:bg-primary"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroundGallery;
