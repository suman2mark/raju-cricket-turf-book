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
  return <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        

        <div className="max-w-5xl mx-auto">
          <Carousel className="relative">
            <CarouselContent>
              {galleryImages.map((image, index) => <CarouselItem key={index} className="md:basis-full">
                  <div className="p-1">
                    <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                      <div className="aspect-video overflow-hidden">
                        
                      </div>
                    </Card>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
              <CarouselPrevious className="relative static left-0 translate-y-0 bg-white/80 hover:bg-white border-primary text-primary" />
              <CarouselNext className="relative static right-0 translate-y-0 bg-white/80 hover:bg-white border-primary text-primary" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>;
};
export default GroundGallery;