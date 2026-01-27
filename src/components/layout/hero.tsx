'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useI18n } from '@/lib/i18n/i18n-context';

const sliderImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
  },
];

export function Hero() {
  const { t } = useI18n();
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const slides = t('hero.slides');

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden group">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="h-[50vh] md:h-[70vh] ml-0">
            {sliderImages.map((image, index) => (
              <CarouselItem key={image.id} className="relative w-full h-full pl-0">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={image.url}
                    alt={slides[index]?.title || ''}
                    fill
                    className="object-cover transition-transform duration-[10000ms] group-hover:scale-110"
                    priority
                  />
                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 z-20">
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                          {slides[index]?.title}
                        </h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-lg shadow-primary/50" />
                      </div>
                      
                      <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 ease-out">
                        {slides[index]?.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 ease-out pt-4">
                        <Button asChild size="lg" className="rounded-full px-8 text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
                          <Link href="/rooms">{t('hero.exploreRooms')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-lg font-bold bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                          <Link href="#menu">{t('hero.viewMenu')}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Floating Glass Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {sliderImages.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-white/30 backdrop-blur-md transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
