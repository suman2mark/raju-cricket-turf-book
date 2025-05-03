
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';

const GroundGallery: React.FC = () => {
  const { translate } = useLanguage();

  const galleryImages = [
    {
      src: '/lovable-uploads/8911d801-ca01-46c9-994b-49ffb4ea0c4d.png',
      alt: 'Night cricket ground with yellow stumps and a bat'
    },
    {
      src: '/lovable-uploads/31637c3f-4ddb-4ecb-aa61-689aac331a11.png',
      alt: 'Day time cricket ground with yellow stumps'
    }
  ];
  
  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{translate('ground_gallery') || 'Our Cricket Ground'}</h2>
          <div className="w-20 h-1 bg-primary my-4 mx-auto"></div>
          <p className="text-xl text-gray-600">{translate('gallery_subtitle') || 'Experience our premium cricket facilities'}</p>
        </div>
        
        <div className="max-w-5xl mx-auto mt-12">
          <Carousel className="w-full">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/1">
                  <div className="p-1">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-xl">
                      <div className="aspect-video relative overflow-hidden group">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <p className="text-white text-lg font-medium">{image.alt}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GroundGallery;
