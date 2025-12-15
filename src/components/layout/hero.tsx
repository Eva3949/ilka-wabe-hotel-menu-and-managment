'use client';

import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import React from 'react';

const heroImage = placeholderImages.find(img => img.id === '9');

export function Hero() {
  if (!heroImage) {
    return null; // or a fallback
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover"
        data-ai-hint={heroImage.imageHint}
        priority
      />
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
