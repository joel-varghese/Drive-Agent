"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
};

const DOT_SPACING = 28;
const DOT_RADIUS = 1.35;
const MOUSE_RADIUS = 110;
const PUSH_FORCE = 0.28;
const RETURN_FORCE = 0.035;
const FRICTION = 0.9;

export function InteractiveDotBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dots: Dot[] = [];
    let animationFrame = 0;

    const buildGrid = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;

      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(255, 255, 255, 0.8)";

      for (const dot of dots) {
        const dx = dot.x - mouseRef.current.x;
        const dy = dot.y - mouseRef.current.y;
        const distance = Math.hypot(dx, dy);

        if (distance < MOUSE_RADIUS && distance > 0) {
          const force = ((MOUSE_RADIUS - distance) / MOUSE_RADIUS) * PUSH_FORCE;
          dot.vx += (dx / distance) * force;
          dot.vy += (dy / distance) * force;
        }

        dot.vx += (dot.baseX - dot.x) * RETURN_FORCE;
        dot.vy += (dot.baseY - dot.y) * RETURN_FORCE;

        dot.vx *= FRICTION;
        dot.vy *= FRICTION;

        dot.x += dot.vx;
        dot.y += dot.vy;

        context.beginPath();
        context.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const onPointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const onResize = () => {
      buildGrid();
    };

    buildGrid();
    animate();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
