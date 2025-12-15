'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
    alt: 'A bustling restaurant interior with warm lighting.',
    imageHint: 'restaurant interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    alt: 'An elegant restaurant dining table setup.',
    imageHint: 'restaurant table',
  },
  {
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80',
    alt: 'A modern restaurant with a beautiful interior design.',
    imageHint: 'modern restaurant',
  },
];

export function Hero() {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="w-full h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
        <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg">
          Haile Restaurant and Spa
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
          Discover a curated selection of our finest dishes, drinks, and desserts, crafted with love and the freshest ingredients.
        </p>
      </div>
    </div>
  );
}
