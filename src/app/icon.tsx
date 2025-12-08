import { ImageResponse } from 'next/og';

// 路由段配置
export const runtime = 'edge';

// 图片尺寸
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// 图片生成函数
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
          background: 'transparent',
        }}
      >
        {/* 1. 圆形底座：使用更明亮、更浅的紫色渐变 */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            // 使用 Violet-500 到 Violet-600 的渐变，比之前的深紫色更透亮
            background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // 微微的阴影，让它像个浮起的按钮
            boxShadow: '0 2px 4px rgba(124, 58, 237, 0.3)',
          }}
        >
          {/* 2. 核心指针：极简的菱形，占据画面中心 */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 上半部分针尖 (指向北) - 纯白色，最显眼 */}
            <path
              d="M12 2L17 12H7L12 2Z"
              fill="#ffffff"
            />
            
            {/* 下半部分针尾 (指向南) - 浅淡的淡紫色，形成一种“折纸”或“宝石”的切面感 */}
            <path
              d="M12 22L7 12H17L12 22Z"
              fill="#ddd6fe" // violet-200，非常浅的紫，与白色形成柔和对比
            />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}