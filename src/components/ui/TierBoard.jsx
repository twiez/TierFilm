import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  DndContext, DragOverlay, closestCenter, 
  PointerSensor, TouchSensor, useSensor, useSensors, useDroppable
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { TIER_ORDER, addToTier, getItemTier, getTierMeta } from '../../utils/tierUtils';
import TierRow from './TierRow';
import PosterCard from './PosterCard';
import SortableItem from './SortableItem';

export default function TierBoard({ tierList, onChange, viewOnly = false }) {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeDragItem, setActiveDragItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const { setNodeRef: setPoolRef, isOver: isPoolOver } = useDroppable({
    id: 'pool',
    disabled: viewOnly
  });

  // Bir item'a tıklanınca: tier seçim modalı göster
  const handleItemClick = (item, currentTier) => {
    if (viewOnly) return;
    setSelectedItem({ item, currentTier });
  };

  // Tiers'a yerleştir
  const handlePlaceInTier = (tier) => {
    if (!selectedItem) return;
    const updated = addToTier(tierList, selectedItem.item, tier);
    onChange?.(updated);
    setSelectedItem(null);
  };

  // Havuza gönder (tier'dan çıkar)
  const handleSendToPool = () => {
    if (!selectedItem) return;
    const updated = addToTier(tierList, selectedItem.item, null);
    onChange?.(updated);
    setSelectedItem(null);
  };

  // Havuzdaki item'a tıkla — yerleştirmek için
  const handlePoolItemClick = (item) => {
    if (viewOnly) return;
    setSelectedItem({ item, currentTier: null });
  };



  const handleDragStart = (event) => {
    setActiveDragItem(event.active.data.current?.item || null);
  };

  const handleDragEnd = (event) => {
    setActiveDragItem(null);
    const { active, over } = event;
    if (!over || viewOnly) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const activeItem = active.data.current?.item;
    if (!activeItem) return;

    // Dropped directly on a Tier Row
    if (TIER_ORDER.includes(overId)) {
      onChange?.(addToTier(tierList, activeItem, overId));
      return;
    }

    // Dropped directly on the Pool
    if (overId === 'pool') {
      onChange?.(addToTier(tierList, activeItem, null));
      return;
    }

    // Dropped on another item, find its container
    const targetTier = getItemTier(tierList, overId);
    onChange?.(addToTier(tierList, activeItem, targetTier));
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-2">
      {/* Tier rows */}
      {TIER_ORDER.map((tier) => (
        <TierRow
          key={tier}
          tierList={tierList}
          tier={tier}
          items={tierList.tiers[tier] || []}
          onItemClick={handleItemClick}
          viewOnly={viewOnly}
        />
      ))}

      {/* Havuz (pool) */}
      {!viewOnly && (
        <div className="pool-section mt-4">
          <p className="text-xs text-text-muted font-semibold tracking-widest uppercase mb-2">
            {t('tiers.unsortedTitle')}
          </p>
          <div
            ref={setPoolRef}
            className={`min-h-[80px] rounded-xl border p-2 flex flex-wrap gap-2 items-start transition-colors ${
              isPoolOver ? 'border-primary bg-primary/10' : 'border-border bg-bg-elevated'
            }`}
          >
            <SortableContext items={(tierList.pool || []).map(i => i.id)} strategy={rectSortingStrategy}>
              {tierList.pool?.length > 0 ? (
                tierList.pool.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    viewOnly={viewOnly}
                    onClick={() => handlePoolItemClick(item)}
                  />
                ))
              ) : (
                <p className="text-text-muted text-xs italic px-2 pt-1 pointer-events-none">
                  {t('tiers.searchHint')}
                </p>
              )}
            </SortableContext>
          </div>
        </div>
      )}

      {/* Tier seçim modalı */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass-strong rounded-2xl p-5 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 shrink-0 rounded-lg overflow-hidden">
                  <PosterCard item={selectedItem.item} compact />
                </div>
                <div className="min-w-0">
                  <p className="text-text-primary font-semibold text-sm leading-tight truncate">
                    {selectedItem.item.title}
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">Hangi tier'a eklensin?</p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {TIER_ORDER.map((tier) => {
                  const meta = getTierMeta(tierList, tier);
                  return (
                    <button
                      key={tier}
                      onClick={() => handlePlaceInTier(tier)}
                      className="py-2.5 rounded-lg font-extrabold text-lg transition-all duration-150 hover:scale-105 active:scale-95"
                      style={{
                        background: meta.bg,
                        border: `1.5px solid ${meta.border}`,
                        color: meta.color,
                      }}
                    >
                      {meta.label}
                    </button>
                  );
                })}
              </div>

              {selectedItem.currentTier && (
                <button
                  onClick={handleSendToPool}
                  className="w-full py-2 text-xs text-text-muted hover:text-text-secondary border border-border rounded-lg transition-colors"
                >
                  Havuza gönder
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      <DragOverlay dropAnimation={{ duration: 150, easing: 'ease' }}>
        {activeDragItem ? (
          <div className="w-14 sm:w-16 shrink-0 shadow-2xl opacity-90 scale-105 rotate-3">
            <PosterCard item={activeDragItem} compact disabled />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
