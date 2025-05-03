
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
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{translate('our_grounds')}</h2>
          <p className="text-xl text-gray-600">{translate('explore_facilities')}</p>
        </div>

        <Carousel
          setApi={setApi}
          className="max-w-5xl mx-auto"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl">
                    <div className="aspect-square relative overflow-hidden group">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <CirclePlay className="w-12 h-12 text-white/90" />
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white border-none shadow-md w-10 h-10" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white border-none shadow-md w-10 h-10" />
        </Carousel>

        {/* Image indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                "bg-gray-300 hover:bg-primary/70"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroundGallery;
