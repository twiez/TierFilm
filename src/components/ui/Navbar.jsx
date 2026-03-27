import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { to: '/olustur', label: t('nav.createList') },
    { to: '/karsilastir', label: t('nav.compare') },
  ];

  const currentLang = i18n.language === 'tr' ? 'tr' : 'en';
  const toggleLang = () => {
    const next = currentLang === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(8,8,15,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-gradient">{t('nav.brandPrimary')}</span>
              <span className="text-white">{t('nav.brandSecondary')}</span>
            </span>
            <span className="hidden sm:inline text-xs text-text-muted font-medium px-1.5 py-0.5 rounded border border-border bg-bg-elevated">
              {t('nav.beta')}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${location.pathname === link.to
                    ? 'text-accent-light bg-accent/10 border border-accent/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/olustur" className="ml-2 btn-primary text-xs px-4 py-2">
              + {t('nav.newList')}
            </Link>

            <button
              type="button"
              onClick={toggleLang}
              className="ml-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-bg-elevated text-[10px] font-semibold text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              aria-label={t('language.switchLabel')}
            >
              <span
                className={`px-1.5 py-0.5 rounded-full ${currentLang === 'en' ? 'bg-accent text-black' : ''}`}
              >
                {t('language.en')}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded-full ${currentLang === 'tr' ? 'bg-accent text-black' : ''}`}
              >
                {t('language.tr')}
              </span>
            </button>
          </div>

          {/* Mobile hamburger & language */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="px-2 py-1 rounded-full border border-border text-[10px] font-semibold text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              aria-label={t('language.switchLabel')}
            >
              {currentLang === 'en' ? t('language.en') : t('language.tr')}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 -mr-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all active:scale-95"
              aria-label={t('nav.openMenu')}
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className={`h-0.5 w-full bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-border pb-3 pt-2 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === link.to
                    ? 'text-accent-light bg-accent/10'
                    : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/olustur"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-1 text-xs justify-center"
            >
              + {t('nav.newList')}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
