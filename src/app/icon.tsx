// src/app/icon.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: '50%', // 圆形
          border: '4px solid #7c3aed', // 紫色边框
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 指向右上角的箭头 */}
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    ),
    { ...size }
  );
}