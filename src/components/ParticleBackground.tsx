import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
  saturation: number;
  lightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
  brightness: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particleCount = 80;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isBrightStar = Math.random() > 0.7;
      const isBlueStar = Math.random() > 0.6;
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: isBrightStar ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.5,
        opacity: isBrightStar ? Math.random() * 0.5 + 0.5 : Math.random() * 0.3 + 0.2,
        hue: isBlueStar ? 200 + Math.random() * 40 : 40 + Math.random() * 20,
        saturation: isBlueStar ? 70 + Math.random() * 30 : 50 + Math.random() * 30,
        lightness: isBlueStar ? 70 + Math.random() * 20 : 80 + Math.random() * 15,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        brightness: 1,
      });
    }

    particlesRef.current = particles;

    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 180) {
          const force = (180 - distance) / 180;
          particle.vx -= (dx / distance) * force * 0.008;
          particle.vy -= (dy / distance) * force * 0.008;
        }

        particle.vx *= 0.995;
        particle.vy *= 0.995;
        
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        particle.twinklePhase += particle.twinkleSpeed;
        particle.brightness = 0.7 + Math.sin(particle.twinklePhase) * 0.3;
        
        const currentOpacity = particle.opacity * particle.brightness;
        const glowRadius = particle.radius * 4;
        
        const outerGlow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius
        );
        outerGlow.addColorStop(0, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${currentOpacity * 0.8})`);
        outerGlow.addColorStop(0.3, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${currentOpacity * 0.3})`);
        outerGlow.addColorStop(0.6, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${currentOpacity * 0.1})`);
        outerGlow.addColorStop(1, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        const coreGlow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 1.5
        );
        coreGlow.addColorStop(0, `hsla(${particle.hue}, 30%, 95%, ${currentOpacity})`);
        coreGlow.addColorStop(0.5, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${currentOpacity * 0.8})`);
        coreGlow.addColorStop(1, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = coreGlow;
        ctx.fill();
      });

      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const baseOpacity = (1 - distance / 150);
            const avgBrightness = (p1.brightness + p2.brightness) / 2;
            const opacity = baseOpacity * 0.25 * avgBrightness;
            
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `hsla(${p1.hue}, ${p1.saturation}%, ${p1.lightness}%, ${opacity})`);
            gradient.addColorStop(0.5, `hsla(${(p1.hue + p2.hue) / 2}, 60%, 70%, ${opacity * 0.8})`);
            gradient.addColorStop(1, `hsla(${p2.hue}, ${p2.saturation}%, ${p2.lightness}%, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}