import React, { useRef, useEffect, useCallback, useState } from 'react';

const TRAIL_COUNT = 6;
const DESKTOP_RADIUS = 200;
const MOBILE_RADIUS_RATIO = 0.3;
const POLYGON_SEGMENTS = 30;

interface TrailPoint {
  x: number;
  y: number;
}

interface TrailSystem {
  targetX: number;
  targetY: number;
  trailPoints: TrailPoint[];
  animationId: number;
  isInside: boolean;
}

function createTrailSystem(): TrailSystem {
  return {
    targetX: 0,
    targetY: 0,
    trailPoints: Array(TRAIL_COUNT).fill(null).map(() => ({ x: 0, y: 0 })),
    animationId: 0,
    isInside: false,
  };
}

function buildClipPath(system: TrailSystem, radius: number): string {
  const head = system.trailPoints[0];
  const tail = system.trailPoints[5];

  const diffX = head.x - tail.x;
  const diffY = head.y - tail.y;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);

  if (distance < 10) {
    return `circle(${radius}px at ${head.x}px ${head.y}px)`;
  }

  const angle = Math.atan2(diffY, diffX);
  const points: string[] = [];

  for (let i = 0; i <= POLYGON_SEGMENTS; i++) {
    const theta = angle - Math.PI / 2 + (Math.PI * i) / POLYGON_SEGMENTS;
    const x = head.x + radius * Math.cos(theta);
    const y = head.y + radius * Math.sin(theta);
    points.push(`${x}px ${y}px`);
  }

  for (let i = 0; i <= POLYGON_SEGMENTS; i++) {
    const theta = angle + Math.PI / 2 + (Math.PI * i) / POLYGON_SEGMENTS;
    const x = tail.x + radius * Math.cos(theta);
    const y = tail.y + radius * Math.sin(theta);
    points.push(`${x}px ${y}px`);
  }

  return `polygon(${points.join(', ')})`;
}

function updateTrailPoints(system: TrailSystem): void {
  for (let t = 0; t < TRAIL_COUNT; t++) {
    const prevX = t === 0 ? system.targetX : system.trailPoints[t - 1].x;
    const prevY = t === 0 ? system.targetY : system.trailPoints[t - 1].y;
    const damping = 0.7 - 0.04 * t;

    system.trailPoints[t].x += (prevX - system.trailPoints[t].x) * damping;
    system.trailPoints[t].y += (prevY - system.trailPoints[t].y) * damping;
  }
}

function calcBounceTarget(x: number, y: number, w: number, h: number) {
  let tx = x;
  let ty = y;
  if (x <= 0) tx = -400;
  else if (x >= w) tx = w + 400;
  if (y <= 0) ty = -400;
  else if (y >= h) ty = h + 400;
  return { tx, ty };
}

export default function MiMoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const z2Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<TrailSystem>(createTrailSystem());
  const visibleRef = useRef(false);
  const radiusRef = useRef(DESKTOP_RADIUS);
  const [flipped, setFlipped] = useState(false);
  const flippedRef = useRef(false);

  // Keep flippedRef in sync so native event handlers can read it
  useEffect(() => {
    flippedRef.current = flipped;
  }, [flipped]);

  // Responsive radius
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        radiusRef.current = w <= 768 ? Math.max(80, w * MOBILE_RADIUS_RATIO) : DESKTOP_RADIUS;
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Animation loop — stable, only reads refs
  const animateLoop = useCallback(() => {
    if (!visibleRef.current || flippedRef.current) return;
    const sys = trailRef.current;
    const radius = radiusRef.current;
    updateTrailPoints(sys);
    if (z2Ref.current) {
      z2Ref.current.style.clipPath = buildClipPath(sys, radius);
    }
    if (labelRef.current) {
      const head = sys.trailPoints[0];
      const labelRect = labelRef.current.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect && labelRect) {
        const lx = labelRect.left + labelRect.width / 2 - containerRect.left;
        const ly = labelRect.top + labelRect.height / 2 - containerRect.top;
        const dx = lx - head.x;
        const dy = ly - head.y;
        const inside = Math.sqrt(dx * dx + dy * dy) < radius;
        labelRef.current.style.color = inside ? '#ffffff' : '';
      }
    }
    sys.animationId = requestAnimationFrame(animateLoop);
  }, []);

  // Hide circle — stable, only reads refs
  const hideCircle = useCallback(() => {
    visibleRef.current = false;
    const sys = trailRef.current;
    sys.isInside = false;
    if (sys.animationId) {
      cancelAnimationFrame(sys.animationId);
      sys.animationId = 0;
    }
    if (z2Ref.current) {
      z2Ref.current.style.clipPath = 'circle(0px at -300px -300px)';
    }
    if (labelRef.current) {
      labelRef.current.style.color = '';
    }
  }, []);

  // Start circle at position — stable, only reads refs
  const startCircle = useCallback((x: number, y: number) => {
    if (flippedRef.current) return;
    visibleRef.current = true;
    const sys = trailRef.current;
    sys.targetX = x;
    sys.targetY = y;
    sys.isInside = true;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      sys.trailPoints[i] = { x, y };
    }
    if (!sys.animationId) {
      sys.animationId = requestAnimationFrame(animateLoop);
    }
  }, [animateLoop]);

  // Move circle target — stable, only reads refs
  const moveCircle = useCallback((x: number, y: number) => {
    if (!visibleRef.current || flippedRef.current) return;
    trailRef.current.targetX = x;
    trailRef.current.targetY = y;
  }, []);

  // ===== Mouse handlers (desktop) =====
  const onMouseEnter = useCallback((e: React.MouseEvent) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    startCircle(e.clientX - rect.left, e.clientY - rect.top);
  }, [startCircle, flipped]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!visibleRef.current || flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    trailRef.current.targetX = e.clientX - rect.left;
    trailRef.current.targetY = e.clientY - rect.top;
  }, [flipped]);

  const onMouseLeave = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { tx, ty } = calcBounceTarget(x, y, rect.width, rect.height);
    trailRef.current.targetX = tx;
    trailRef.current.targetY = ty;
    hideCircle();
  }, [hideCircle]);

  // ===== Native touch listeners (mobile) — need passive:false to prevent scroll =====
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchActive = false;

    const isFlipTrigger = (el: EventTarget | null): boolean =>
      !!(el as HTMLElement).closest?.('.mimo-flip-label, .mimo-crack-zone');

    const handleTouchStart = (e: TouchEvent) => {
      if (flippedRef.current) return;
      if (isFlipTrigger(e.target)) return;

      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      // Only capture touches in the upper interactive zone (top 70%)
      // Lower 30% is text + buttons area — let the page scroll normally there
      if (y > rect.height * 0.7) return;

      e.preventDefault();
      touchActive = true;
      startCircle(x, y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchActive || flippedRef.current) return;
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      moveCircle(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const handleTouchEnd = () => {
      if (!touchActive) return;
      touchActive = false;
      hideCircle();
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startCircle, moveCircle, hideCircle]);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => {
      if (!prev) hideCircle();
      return !prev;
    });
  }, [hideCircle]);

  useEffect(() => {
    return () => {
      if (trailRef.current.animationId) {
        cancelAnimationFrame(trailRef.current.animationId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mimo-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div className="mimo-flip-container">
        <div
          className="mimo-flip-inner"
          style={{ transform: flipped ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
        >
          {/* ===== FRONT FACE ===== */}
          <div className="mimo-flip-front">
            <h1 className="mimo-title-zh">超算与并行计算团队</h1>

            <div ref={z2Ref} className="mimo-z2" style={{ clipPath: 'circle(0px at -300px -300px)' }}>
              <h1 className="mimo-title-en">Exploring the Parallel Frontier</h1>
            </div>

            <span ref={labelRef} className="mimo-flip-label" onClick={handleFlip}>
              关于我们
            </span>
            <div className="mimo-crack-zone" onClick={handleFlip} />
          </div>

          {/* ===== BACK FACE ===== */}
          <div className="mimo-flip-back">
            <div className="mimo-back-content">
              <div className="mimo-back-card">
                <p>
                  欢迎来到<strong>超算与并行计算团队</strong>，一个汇聚算力梦想与底层技术热情的地方。
                </p>
                <p>
                  我们面向<strong>国家算力基础设施</strong>与<strong>国产生态建设</strong>，深耕国产CPU适配、并行算法优化与高性能应用开发。从HPC到AI Infra，从ASC竞赛到真实工业场景，我们用代码探索计算的边界。
                </p>
                <p>
                  团队成立于2019年，累计获得<strong>60余项</strong>国内外超算竞赛奖项，涵盖ASC一等奖、CPC金奖等顶级荣誉。我们相信，一个人可以优化一段代码，一群人能够重建计算的法则。
                </p>
                <p>
                  明德笃志，博学创新 —— 我们在这里，期待你的加入。
                </p>
              </div>
              <span className="mimo-flip-back-label" onClick={handleFlip}>
                返回
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
