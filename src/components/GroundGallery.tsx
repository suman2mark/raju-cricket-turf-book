
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const GroundGallery: React.FC = () => {
  const { translate } = useLanguage();

  // Gallery images with cricket ground scenes
  const galleryImages = [
    {
      src: '/lovable-uploads/peddi4.gif',
      alt: 'Hit Hard, Play Smart!',
      caption: translate('book_your_game') || 'Book Your Game Now'
    },
    {
      src: '/lovable-uploads/peddi3.gif',
      alt: 'Fast. Fierce. Fun.',
      caption: translate('Unbox the Cricket Fever!') || 'Smash It at Raju Sixer Adda'
    },
    {
      src: '/lovable-uploads/box4.jpg',
      alt: 'Smash It in the Box!',
      caption: translate('smash_it') || 'Premium Cricket Experience'
    }
  ];

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

  return (
    <section id="gallery" className="w-full py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{translate('our_facilities') || 'Our Cricket Facilities'}</h2>
          <p className="text-gray-600">{translate('gallery_subtitle') || 'Experience our premium cricket turf day and night'}</p>
        </div>
        
        <Carousel
          setApi={setApi}
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                <div className="p-1 h-full">
                  <Card className="overflow-hidden border-none shadow-lg h-[300px] md:h-[400px] lg:h-[500px] relative group">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${image.src}')` }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-white text-2xl font-bold drop-shadow-md">{image.caption}</h3>
                        <p className="text-white/80">{image.alt}</p>
                      </div>
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 text-white cursor-pointer hover:bg-primary transition-colors">
                          <Play className="h-8 w-8" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="hidden md:flex -left-4 md:-left-6 hover:bg-primary hover:text-white h-10 w-10" />
          <CarouselNext className="hidden md:flex -right-4 md:-right-6 hover:bg-primary hover:text-white h-10 w-10" />
        </Carousel>
        
        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-4">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                current === index ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroundGallery;
