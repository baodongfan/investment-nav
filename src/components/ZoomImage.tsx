// src/components/ZoomImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ZoomImage({ src, alt, ...props }: any) {
  const [isZoomed, setIsZoomed] = useState(false);

  // 如果没有 src，直接不渲染
  if (!src) return null;

  return (
    <>
      {/* 缩略图状态 */}
      <img
        src={src}
        alt={alt || 'image'}
        className={`rounded-lg cursor-zoom-in transition-all hover:opacity-90 ${props.className || ''}`}
        onClick={() => setIsZoomed(true)}
        style={{ maxWidth: '100%', height: 'auto' }}
        {...props}
      />

      {/* 放大后的遮罩层 */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 cursor-zoom-out p-4 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={src}
            alt={alt || 'zoomed image'}
            className="max-w-full max-h-[95vh] object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-200"
          />
        </div>
      )}
    </>
  );
}