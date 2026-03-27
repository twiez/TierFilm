import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/layout/PageLayout';
import FeatureCard from '../components/ui/FeatureCard';
import { DEFAULT_TIER_META as TIER_META, TIER_ORDER } from '../utils/tierUtils';

const MOCK_PREVIEW = {
  S: ['Inception', 'The Dark Knight'],
  A: ['Interstellar', 'Oppenheimer'],
  B: ['Dune', 'Parasite'],
  C: ['Squid Game'],
  D: [],
};

const features = (t) => [
  {
    icon: '🎬',
    title: t('features.create.title'),
    description: t('features.create.description'),
  },
  {
    icon: '🔗',
    title: t('features.share.title'),
    description: t('features.share.description'),
  },
  {
    icon: '🤝',
    title: t('features.compare.title'),
    description: t('features.compare.description'),
  },
];

function TierPreview() {
  const { t } = useTranslation();

  return (
    <div className="glass rounded-2xl overflow-hidden border border-border w-full max-w-sm">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-text-muted text-xs">{t('home.previewListName')}</span>
      </div>
      <div className="p-2 space-y-1">
        {TIER_ORDER.map((tier) => {
          const meta = TIER_META[tier];
          const items = MOCK_PREVIEW[tier] || [];
          return (
            <div
              key={tier}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 min-h-[36px]"
              style={{ background: meta.bg, border: `1px solid ${meta.border}` }}
            >
              <span className="w-6 text-center font-extrabold text-sm shrink-0" style={{ color: meta.color }}>
                {tier}
              </span>
              <div className="flex flex-wrap gap-1">
                {items.map((title) => (
                  <span
                    key={title}
                    className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(0,0,0,0.3)', color: meta.color }}
                  >
                    {title}
                  </span>
                ))}
                {items.length === 0 && (
                  <span className="text-text-muted text-[10px] italic">
                    {t('home.previewEmpty')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompatPreview() {
  const { t } = useTranslation();

  return (
    <div className="glass-strong rounded-2xl p-5 text-center border border-border">
      <p className="text-text-muted text-xs mb-2 tracking-widest uppercase font-semibold">
        {t('home.compatMatchHeading')}
      </p>
      <div
        className="text-5xl font-extrabold mb-1"
        style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        %82
      </div>
      <p className="text-text-muted text-xs">
        {t('home.compatFromItems')}
      </p>
      <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-left">
        <div>
          <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">
            {t('home.compatAgree')}
          </p>
          <p className="text-text-primary text-xs font-medium">Interstellar</p>
          <p className="text-text-primary text-xs font-medium">The Dark Knight</p>
        </div>
        <div>
          <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">
            {t('home.compatDisagree')}
          </p>
          <p className="text-text-secondary text-xs">Squid Game</p>
          <p className="text-text-secondary text-xs">Dune</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <section className="relative px-4 sm:px-6 pt-16 pb-20 max-w-6xl mx-auto">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-xs font-semibold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse-slow" />
              {t('home.badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5"
            >
              {t('home.heroTitleLine1')}{' '}
              <span className="text-gradient">{t('home.heroTitleLine2')}</span>
              <br />
              {t('home.heroTitleLine3')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-secondary text-lg leading-relaxed mb-8 max-w-md"
            >
              {t('home.heroDescription')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/olustur" className="btn-primary text-sm px-6 py-3">
                {t('home.ctaCreate')}
              </Link>
              <Link to="/karsilastir" className="btn-secondary text-sm px-6 py-3">
                {t('home.ctaCompare')}
              </Link>
            </motion.div>
          </div>

          {/* Right: mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="hidden lg:flex flex-col gap-4 items-center"
          >
            <TierPreview />
            <CompatPreview />
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 max-w-6xl mx-auto">
        <div className="divider mb-12" />
        <div className="text-center mb-8">
          <p className="section-label mb-2">{t('home.howItWorksLabel')}</p>
          <h2 className="text-2xl font-extrabold text-text-primary">
            {t('home.howItWorksTitle')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {features(t).map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Mobile preview */}
      <section className="lg:hidden px-4 sm:px-6 pb-16 max-w-sm mx-auto">
        <TierPreview />
      </section>
    </PageLayout>
  );
}
