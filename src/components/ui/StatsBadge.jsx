import { DEFAULT_TIER_META as TIER_META } from '../../utils/tierUtils';

export default function StatsBadge({ label, value, icon, accent = false }) {
  return (
    <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border
      ${accent
        ? 'bg-accent/10 border-accent/30 text-accent-light'
        : 'bg-bg-elevated border-border text-text-secondary'
      }`}
    >
      {icon && <span className="text-base">{icon}</span>}
      <div>
        <p className="text-lg font-extrabold leading-none text-text-primary">{value}</p>
        <p className="text-[10px] font-medium mt-0.5 leading-none">{label}</p>
      </div>
    </div>
  );
}

export function TierDistBadge({ tier, count }) {
  const meta = TIER_META[tier];
  if (!meta) return null;
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold"
      style={{ background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color }}
    >
      <span>{tier}</span>
      <span className="text-text-secondary font-normal opacity-80">{count}</span>
    </div>
  );
}
