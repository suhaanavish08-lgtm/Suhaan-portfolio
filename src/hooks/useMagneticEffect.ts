import { useRef, useCallback } from 'react';

interface MagneticConfig {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect({ strength = 0.3, radius = 150 }: MagneticConfig = {}) {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  }, []);

  return { elementRef, handleMouseMove, handleMouseLeave };
}
