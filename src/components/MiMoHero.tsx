import React, { useRef, useEffect, useCallback, useState } from 'react';

const TRAIL_COUNT = 6;
const CIRCLE_RADIUS = 200;
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

function buildClipPath(system: TrailSystem): string {
  const head = system.trailPoints[0];
  const tail = system.trailPoints[5];

  const diffX = head.x - tail.x;
  const diffY = head.y - tail.y;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);

  if (distance < 10) {
    return `circle(${CIRCLE_RADIUS}px at ${head.x}px ${head.y}px)`;
  }

  const angle = Math.atan2(diffY, diffX);
  const points: string[] = [];

  for (let i = 0; i <= POLYGON_SEGMENTS; i++) {
    const theta = angle - Math.PI / 2 + (Math.PI * i) / POLYGON_SEGMENTS;
    const x = head.x + CIRCLE_RADIUS * Math.cos(theta);
    const y = head.y + CIRCLE_RADIUS * Math.sin(theta);
    points.push(`${x}px ${y}px`);
  }

  for (let i = 0; i <= POLYGON_SEGMENTS; i++) {
    const theta = angle + Math.PI / 2 + (Math.PI * i) / POLYGON_SEGMENTS;
    const x = tail.x + CIRCLE_RADIUS * Math.cos(theta);
    const y = tail.y + CIRCLE_RADIUS * Math.sin(theta);
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
  const [flipped, setFlipped] = useState(false);

  const animate = useCallback(() => {
    if (!visibleRef.current || flipped) return;
    const sys = trailRef.current;
    updateTrailPoints(sys);
    if (z2Ref.current) {
      z2Ref.current.style.clipPath = buildClipPath(sys);
    }
    // Toggle label color when under the black mask
    if (labelRef.current) {
      const head = sys.trailPoints[0];
      const labelRect = labelRef.current.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect && labelRect) {
        const lx = labelRect.left + labelRect.width / 2 - containerRect.left;
        const ly = labelRect.top + labelRect.height / 2 - containerRect.top;
        const dx = lx - head.x;
        const dy = ly - head.y;
        const inside = Math.sqrt(dx * dx + dy * dy) < CIRCLE_RADIUS;
        labelRef.current.style.color = inside ? '#ffffff' : '';
      }
    }
    sys.animationId = requestAnimationFrame(animate);
  }, [flipped]);

  const onMouseEnter = useCallback((e: React.MouseEvent) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    visibleRef.current = true;
    const sys = trailRef.current;
    sys.targetX = x;
    sys.targetY = y;
    sys.isInside = true;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      sys.trailPoints[i] = { x, y };
    }
    if (!sys.animationId) {
      sys.animationId = requestAnimationFrame(animate);
    }
  }, [animate, flipped]);

  const onMouseLeave = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    visibleRef.current = false;
    const sys = trailRef.current;
    sys.isInside = false;
    const { tx, ty } = calcBounceTarget(x, y, rect.width, rect.height);
    sys.targetX = tx;
    sys.targetY = ty;

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

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!visibleRef.current || flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    trailRef.current.targetX = e.clientX - rect.left;
    trailRef.current.targetY = e.clientY - rect.top;
  }, [flipped]);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => {
      if (!prev) {
        // Flipping to back: kill mouse interaction
        visibleRef.current = false;
        if (trailRef.current.animationId) {
          cancelAnimationFrame(trailRef.current.animationId);
          trailRef.current.animationId = 0;
        }
        if (z2Ref.current) {
          z2Ref.current.style.clipPath = 'circle(0px at -300px -300px)';
        }
        if (labelRef.current) {
          labelRef.current.style.color = '';
        }
      }
      return !prev;
    });
  }, []);

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
