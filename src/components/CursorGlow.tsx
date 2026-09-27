import { useEffect, useRef } from 'react';
import { useIsTouchDevice } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const glow = glowRef.current;
    if (!glow) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      glow.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(184, 255, 87, 0.04), rgba(124, 106, 239, 0.02) 40%, transparent 70%)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        transition: 'none',
      }}
      aria-hidden="true"
    />
  );
}
