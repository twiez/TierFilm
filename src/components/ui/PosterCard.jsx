import { motion } from 'framer-motion';
import { getPosterUrl, getReleaseYear } from '../../services/mockData';
import { DEFAULT_TIER_META as TIER_META } from '../../utils/tierUtils';

export default function PosterCard({ item, onClick, compact = false, tierBadge = null, className = '' }) {
  const posterUrl = getPosterUrl(item?.poster_path);
  const year = getReleaseYear(item?.release_date);
  const isTV = item?.media_type === 'tv';

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={() => onClick?.(item)}
      className={`relative group cursor-pointer select-none rounded-lg overflow-hidden
        bg-bg-elevated border border-border
        hover:border-border-strong hover:shadow-card-hover
        transition-shadow duration-200 ${className}`}
      title={item?.title}
    >
      {/* Poster image */}
      <div className={`poster-aspect bg-bg-card relative overflow-hidden ${compact ? '' : ''}`}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={item?.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        {/* Fallback */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-bg-card text-text-muted p-2"
          style={{ display: posterUrl ? 'none' : 'flex' }}
        >
          <span className="text-2xl mb-1">{isTV ? '📺' : '🎬'}</span>
          <span className="text-[10px] text-center font-medium leading-tight">{item?.title}</span>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Tier badge */}
        {tierBadge && TIER_META[tierBadge] && (
          <div
            className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md flex items-center justify-center text-xs font-extrabold"
            style={{
              background: TIER_META[tierBadge].bg,
              border: `1px solid ${TIER_META[tierBadge].border}`,
              color: TIER_META[tierBadge].color,
            }}
          >
            {tierBadge}
          </div>
        )}

        {/* TV badge */}
        {isTV && !compact && (
          <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold text-text-muted bg-black/60 border border-border">
            DİZİ
          </div>
        )}
      </div>

      {/* Info below (non-compact) */}
      {!compact && (
        <div className="px-2 py-1.5">
          <p className="text-text-primary text-xs font-semibold leading-tight truncate">{item?.title}</p>
          <p className="text-text-muted text-[10px] mt-0.5">{year}</p>
        </div>
      )}
    </motion.div>
  );
}
