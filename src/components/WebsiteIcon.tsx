'use client';

import { useState, useEffect } from 'react';

interface WebsiteIconProps {
  website: {
    url: string;
    name: string;
    icon?: string;
  };
  className?: string;
}

export default function WebsiteIcon({ website, className }: WebsiteIconProps) {
  // 安全获取域名
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  };

  const hostname = getHostname(website.url);
  
  // 定义三种图标路径
  // 1. Google API (优先)
  const googleIcon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  // 2. 本地图标 (次选 - 需要你之前的脚本下载到 public/icons/websites/ 下)
  const localIcon = `/icons/websites/${hostname}.png`;
  // 3. 默认兜底 (最后)
  const defaultIcon = '/globe.svg';

  // 初始化图片源：如果有手动配置的 icon 则用手动，否则优先用 Google
  const [imgSrc, setImgSrc] = useState(website.icon || googleIcon);

  // 当 website 数据变化时重置状态
  useEffect(() => {
    setImgSrc(website.icon || googleIcon);
  }, [website.url, website.icon, googleIcon]);

  const handleError = () => {
    // 错误处理逻辑：逐级降级
    if (imgSrc === website.icon) {
      // 如果手动配置的挂了，尝试 Google
      setImgSrc(googleIcon);
    } else if (imgSrc === googleIcon) {
      // 如果 Google 挂了，尝试本地
      setImgSrc(localIcon);
    } else if (imgSrc === localIcon) {
      // 如果本地也没图，显示默认地球
      setImgSrc(defaultIcon);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={website.name}
      className={`${className} object-contain`} // 确保图片按比例缩放
      onError={handleError}
      loading="lazy"
    />
  );
}