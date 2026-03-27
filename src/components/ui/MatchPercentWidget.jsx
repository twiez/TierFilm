import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getCompatibilityLabel } from '../../services/comparison';

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(from + (target - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

export default function MatchPercentWidget({ percentage, commonCount, hasEnoughData }) {
  const count = useCountUp(percentage, 1400);
  const { label, color } = getCompatibilityLabel(percentage);

  const ringStyle = {
    background: `conic-gradient(${color} ${percentage * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-strong rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${color}44 0%, transparent 70%)`,
        }}
      />

      {/* Ring */}
      <div className="relative mb-5">
        <div
          className="w-36 h-36 rounded-full flex items-center justify-center"
          style={{
            background: ringStyle.background,
            padding: '4px',
          }}
        >
          <div
            className="w-full h-full rounded-full flex flex-col items-center justify-center"
            style={{ background: '#0f0f1a' }}
          >
            <span className="text-4xl font-extrabold leading-none" style={{ color }}>
              %{count}
            </span>
            <span className="text-text-muted text-xs mt-1">uyum</span>
          </div>
        </div>
      </div>

      <h3 className="text-text-primary font-extrabold text-xl mb-1" style={{ color }}>
        {label}
      </h3>

      <p className="text-text-secondary text-sm">
        {hasEnoughData ? (
          <>
            <span className="text-text-primary font-semibold">{commonCount}</span> ortak yapım üzerinden hesaplandı
          </>
        ) : (
          <>
            Yeterli ortak yapım yok
            {commonCount > 0 && ` (yalnızca ${commonCount} ortak)`}
          </>
        )}
      </p>
    </motion.div>
  );
}
