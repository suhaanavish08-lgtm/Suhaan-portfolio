import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    interface Dot {
      x: number;
      y: number;
      baseAlpha: number;
      alpha: number;
      size: number;
    }

    const dots: Dot[] = [];
    const spacing = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots.length = 0;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseAlpha: 0.08 + Math.random() * 0.04,
            alpha: 0,
            size: 1,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const dot of dots) {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const proximity = 1 - dist / maxDist;
          dot.alpha += (proximity * 0.5 + dot.baseAlpha - dot.alpha) * 0.1;
          dot.size += (1.5 + proximity * 2 - dot.size) * 0.1;
        } else {
          dot.alpha += (dot.baseAlpha - dot.alpha) * 0.05;
          dot.size += (1 - dot.size) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 255, 87, ${dot.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 106, 239, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(184, 255, 87, 0.04), transparent)
          `,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
