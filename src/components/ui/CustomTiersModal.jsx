import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getTierMeta, getTierOrder } from '../../utils/tierUtils';

const COLOR_OPTIONS = [
  { name: 'Kırmızı', value: '#ef4444', text: 'text-red-400' },
  { name: 'Turuncu', value: '#f97316', text: 'text-orange-400' },
  { name: 'Sarı', value: '#f59e0b', text: 'text-amber-400' },
  { name: 'Yeşil', value: '#10b981', text: 'text-emerald-400' },
  { name: 'Mavi', value: '#3b82f6', text: 'text-blue-400' },
  { name: 'Mor', value: '#a855f7', text: 'text-purple-400' },
  { name: 'Pembe', value: '#ec4899', text: 'text-pink-400' },
  { name: 'Gri', value: '#9ca3af', text: 'text-gray-400' }
];

// Helper: hex to rgba
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function CustomTiersModal({ isOpen, onClose, tierList, setTierList }) {
  const { t } = useTranslation();
  // Local state for editing without breaking parent instantly on every keystroke
  const [localSettings, setLocalSettings] = useState(() => {
    return tierList?.settings ? { ...tierList.settings } : {};
  });

  const handleLabelChange = (tierId, newLabel) => {
    setLocalSettings(prev => ({
      ...prev,
      [tierId]: {
        ...prev[tierId],
        label: newLabel || tierId // Fallback to ID if empty
      }
    }));
  };

  const handleColorChange = (tierId, colorObj) => {
    setLocalSettings(prev => ({
      ...prev,
      [tierId]: {
        ...prev[tierId],
        color: colorObj.value,
        bg: hexToRgba(colorObj.value, 0.15),
        border: hexToRgba(colorObj.value, 0.4),
        text: colorObj.text
      }
    }));
  };

  const handleSave = () => {
    setTierList(prev => ({
      ...prev,
      settings: localSettings
    }));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full sm:max-w-lg bg-background-paper border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]"
          >
            <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-base sm:text-xl font-bold font-mono">
                {t('tiers.modalTitle')}
              </h3>
              <button onClick={onClose} className="p-2 text-text-muted hover:text-white transition-colors bg-white/5 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 sm:space-y-6">
              {getTierOrder(tierList).map(tierId => {
                const meta = localSettings[tierId] || getTierMeta(tierList, tierId);
                
                return (
                  <div key={tierId} className="flex flex-col gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border border-white/5 bg-white/5">
                    {/* Preview & Input line */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg font-mono shrink-0"
                        style={{ background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color }}
                      >
                        {meta.label.substring(0,2)}
                      </div>
                      
                      <div className="flex-1">
                        <input
                          type="text"
                          value={meta.label}
                          onChange={(e) => handleLabelChange(tierId, e.target.value)}
                          placeholder={meta.label}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Color Picker Grid */}
                    <div className="flex gap-2 justify-between px-1">
                      {COLOR_OPTIONS.map(c => (
                        <button
                          key={c.value}
                          onClick={() => handleColorChange(tierId, c)}
                          className="w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 transition-transform hover:scale-125 focus:scale-125 focus:outline-none"
                          style={{ 
                            backgroundColor: c.value,
                            borderColor: meta.color === c.value ? 'white' : 'transparent',
                            transform: meta.color === c.value ? 'scale(1.2)' : 'scale(1)'
                          }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 sm:p-5 border-t border-white/5 bg-black/20 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-5 py-2 rounded-lg font-medium text-text-secondary hover:bg-white/5 transition-colors"
              >
                {t('tiers.cancel')}
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 rounded-lg font-bold bg-primary text-white hover:bg-primary-hover transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.save')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
