'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { placeholderImages } from '@/lib/placeholder-images.json';
import React from 'react';

const heroImages = placeholderImages.slice(8, 11); // Use food/drink images

export function Hero() {
  // We need to add a ref to the carousel to apply custom fade effects
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <style>
        {`
        .fade-in-out {
          opacity: 0;
          transition: opacity 1.5s ease-in-out, transform 6s ease-in-out;
          transform: scale(1);
        }
        .fade-in-out.is-active {
          opacity: 1;
          transform: scale(1.05);
        }
        `}
      </style>
      <Carousel
        className="w-full h-full"
        plugins={[plugin.current]}
        opts={{
          loop: true,
          duration: 50, // Slower transition for a more elegant feel
        }}
      >
        <CarouselContent className="w-full h-full -ml-0" emblaApiType="fade">
          {heroImages.map((image, index) => (
            <CarouselItem key={image.id} className="w-full h-full pl-0 fade-in-out">
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
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4 z-10">
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
