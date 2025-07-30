import { useEffect, useRef } from 'react';

interface ScrollSentinelProps {
  onIntersect: () => void;
  enabled: boolean;
}

/**
 * 스크롤 감지 컴포넌트
 */
export const ScrollSentinel = ({ onIntersect, enabled }: ScrollSentinelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: '0px',
        threshold: 1.0, // 완전히 보여질 때
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [enabled]);

  return <div ref={ref} style={{ height: '1px' }} />;
};
