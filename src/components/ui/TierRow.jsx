import { motion, AnimatePresence } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import { getTierMeta } from '../../utils/tierUtils';
import SortableItem from './SortableItem';

export default function TierRow({ tierList, tier, items = [], onItemClick, onItemAdd, viewOnly = false }) {
  const { i18n } = useTranslation();
  const meta = getTierMeta(tierList, tier);

  const { isOver, setNodeRef } = useDroppable({
    id: tier, // Tier ismi droppable id olarak kullanılır
    disabled: viewOnly,
  });

  return (
    <div
      ref={setNodeRef}
      className={`tier-row flex items-stretch min-h-[70px] sm:min-h-[90px] rounded-lg sm:rounded-xl overflow-hidden border transition-colors ${
        isOver && !viewOnly ? 'ring-2 ring-white/50 brightness-110' : ''
      }`}
      style={{
        borderColor: `${meta.border}`,
        background: `${meta.bg}`,
      }}
    >
      {/* Tier Label */}
      <div
        className="flex items-center justify-center min-w-[3.5rem] sm:min-w-[4rem] max-w-[8rem] shrink-0 font-extrabold text-lg sm:text-xl p-2 text-center break-words hyphens-auto"
        style={{
          color: meta.color,
          background: `rgba(0,0,0,0.2)`,
          borderRight: `1px solid ${meta.border}`,
          fontFamily: '"Noto Sans Mono", monospace',
          wordBreak: 'break-word'
        }}
      >
        <span>{meta.label}</span>
      </div>

      {/* Items */}
      <div className="flex-1 flex items-center flex-wrap gap-1.5 sm:gap-2 p-1.5 sm:p-2 min-w-0">
        <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
          <AnimatePresence>
            {items.length > 0 ? (
              items.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  viewOnly={viewOnly}
                  onClick={(clickedItem) => onItemClick?.(clickedItem, tier)}
                />
              ))
            ) : (
              <p className="empty-tier-text text-text-muted text-xs px-2 italic pointer-events-none">
                {viewOnly
                  ? i18n.language === 'tr'
                    ? 'Boş'
                    : 'Empty'
                  : i18n.language === 'tr'
                    ? `${meta.label} tier'ına ekle veya sürükle`
                    : `Add or drag into ${meta.label} tier`}
              </p>
            )}
          </AnimatePresence>
        </SortableContext>
      </div>

      {/* Add button (non-view) */}
      {!viewOnly && onItemAdd && (
        <div className="flex items-center pr-2 shrink-0">
          <button
            onClick={() => onItemAdd?.(tier)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            title={`${meta.label} tier'ına ekle`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
