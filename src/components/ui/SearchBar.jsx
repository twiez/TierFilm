import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar({ query, onChange, placeholder = 'Film veya dizi ara...', isLoading = false, autoFocus = false }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="relative w-full">
      {/* Search icon */}
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-10 pr-10"
        spellCheck={false}
        autoComplete="off"
      />

      {/* Loading/Clear */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-4 h-4 border-2 border-accent/40 border-t-accent rounded-full animate-spin"
            />
          ) : query ? (
            <motion.button
              key="clear"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onChange('')}
              className="text-text-muted hover:text-text-secondary transition-colors"
              aria-label="Temizle"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
