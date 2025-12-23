import { Bed } from 'lucide-react';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#FAF9F6', // Light cream
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#A69382', // Muted brown
          borderRadius: '8px',
        }}
      >
        <Bed />
      </div>
    ),
    {
      ...size,
    }
  );
}
