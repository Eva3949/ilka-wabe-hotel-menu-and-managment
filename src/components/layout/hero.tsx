'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { placeholderImages } from '@/lib/placeholder-images.json';

const heroImages = placeholderImages.slice(8, 11); // Use food/drink images

export function Hero() {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
          duration: 35, // Slower, smoother transition
        }}
      >
        <CarouselContent className="w-full h-full -ml-0">
          {heroImages.map((image, index) => (
            <CarouselItem key={image.id} className="w-full h-full pl-0">
              <Image
                src={image.imageUrl}
                alt={image.description}
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
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg">
          Haile Restaurant and Spa
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
          Discover a curated selection of our finest dishes, drinks, and desserts, crafted with love and the freshest ingredients.
        </p>
      </div>
    </div>
  );
}
