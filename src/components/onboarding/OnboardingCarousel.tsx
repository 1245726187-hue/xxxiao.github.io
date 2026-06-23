'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { OnboardingSlide } from './OnboardingSlide';

const slides = [
  {
    title: '记录每一餐',
    description: '拍下你的美食照片，让 AI 来完成剩下的工作。轻松有趣的饮食记录，从未如此简单。',
    illustration: '📸',
  },
  {
    title: 'AI 读懂你的食物',
    description: '我们的 AI 能识别食材、计算营养成分，还能自动去除背景，生成精美的食物卡片。',
    illustration: '✨',
  },
  {
    title: '养成更健康的习惯',
    description: '追踪每日营养摄入，观察长期饮食模式，获取 AI 驱动的健康建议，让每一天都吃得更好。',
    illustration: '💚',
  },
];

export function OnboardingCarousel() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* 跳过按钮 */}
      <div className="flex justify-end px-6 pt-6" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.5rem)' }}>
        <button
          onClick={() => router.push('/signup')}
          className="text-ink-tertiary text-caption font-medium hover:text-ink-secondary transition-colors"
        >
          跳过
        </button>
      </div>

      {/* 轮播 */}
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <OnboardingSlide
                title={slide.title}
                description={slide.description}
                illustration={slide.illustration}
                slideNumber={index}
                totalSlides={slides.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作区 */}
      <div className="px-6 pb-12" style={{ paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))' }}>
        <button
          onClick={() => router.push('/signup')}
          className="w-full py-4 bg-accent text-white rounded-card-sm font-semibold text-body
                     shadow-lg shadow-accent/25 active:scale-[0.98] transition-transform"
        >
          开始使用
        </button>
        <p className="text-center mt-4 text-caption text-ink-tertiary">
          已有账号？{' '}
          <button
            onClick={() => router.push('/signin')}
            className="text-accent font-medium hover:underline"
          >
            登录
          </button>
        </p>
      </div>
    </div>
  );
}
