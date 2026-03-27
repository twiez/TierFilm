import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/layout/PageLayout';
import MatchPercentWidget from '../components/ui/MatchPercentWidget';
import PosterCard from '../components/ui/PosterCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { decodeListData } from '../services/listStorage';
import { calculateCompatibility } from '../services/comparison';
import { DEFAULT_TIER_META as TIER_META } from '../utils/tierUtils';

function ComparisonCard({ item, tier1, tier2, author1, author2 }) {
  const m1 = TIER_META[tier1];
  const m2 = TIER_META[tier2];

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-bg-elevated hover:border-border-strong transition-all duration-150">
      <div className="w-10 shrink-0 rounded-md overflow-hidden">
        <PosterCard item={item} compact />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-sm font-semibold truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {m1 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: m1.bg, color: m1.color, border: `1px solid ${m1.border}` }}>
              {author1}: {tier1}
            </span>
          )}
          {m2 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: m2.bg, color: m2.color, border: `1px solid ${m2.border}` }}>
              {author2}: {tier2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, emoji, items, author1, author2, type }) {
  if (!items || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-5"
    >
      <p className="font-bold text-text-primary text-sm mb-3">
        {emoji} {title}
        <span className="ml-2 text-text-muted text-xs font-normal">({items.length} yapım)</span>
      </p>
      <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
        {items.map((entry) => (
          <ComparisonCard
            key={entry.item.id}
            item={entry.item}
            tier1={type === 'list2liked' ? entry.tier2 : entry.tier1}
            tier2={type === 'list2liked' ? entry.tier1 : entry.tier2}
            author1={type === 'list2liked' ? author2 : author1}
            author2={type === 'list2liked' ? author1 : author2}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ComparisonPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [list1Id, setList1Id] = useState(searchParams.get('liste') || '');
  const [list2Id, setList2Id] = useState('');
  const [list1, setList1] = useState(null);
  const [list2, setList2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const result = useMemo(() => {
    if (!list1 || !list2) return null;
    return calculateCompatibility(list1, list2);
  }, [list1, list2]);

  const handleCompare = () => {
    setError('');
    if (!list1Id.trim() || !list2Id.trim()) {
      setError(t('comparison.errorBothRequired'));
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      // URL'den veya direkt encoded string'den veri çıkar
      const extractData = async (input) => {
        const trimmed = input.trim();
        // URL ise ?d= parametresini çıkar
        try {
          const url = new URL(trimmed);
          const d = url.searchParams.get('d');
          if (d) return await decodeListData(d);
        } catch {}
        // Direkt encoded string olarak dene
        return await decodeListData(trimmed);
      };

      const l1 = await extractData(list1Id);
      const l2 = await extractData(list2Id);

      if (!l1 && !l2) {
        setError(t('comparison.errorBothInvalid'));
      } else if (!l1) {
        setError(t('comparison.errorFirstInvalid'));
      } else if (!l2) {
        setError(t('comparison.errorSecondInvalid'));
      } else {
        setList1(l1);
        setList2(l2);
      }
      setLoading(false);
    }, 500);
  };

  const author1 = list1?.authorName || 'Liste 1';
  const author2 = list2?.authorName || 'Liste 2';

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="section-label mb-2">{t('comparison.sectionLabel')}</p>
          <h1 className="page-title mb-2">{t('comparison.pageTitle')}</h1>
          <p className="text-text-secondary text-sm">
            {t('comparison.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="glass rounded-2xl p-5 mb-6"
        >
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-text-muted font-medium mb-1 block">
                {t('comparison.firstListLabel')}
              </label>
              <input
                type="text"
                value={list1Id}
                onChange={(e) => setList1Id(e.target.value.trim())}
                placeholder={t('comparison.inputPlaceholder')}
                className="input"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted font-medium mb-1 block">
                {t('comparison.secondListLabel')}
              </label>
              <input
                type="text"
                value={list2Id}
                onChange={(e) => setList2Id(e.target.value.trim())}
                placeholder={t('comparison.inputPlaceholder')}
                className="input"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-3 font-medium">{error}</p>
          )}

          <button
            onClick={handleCompare}
            disabled={loading}
            className="btn-primary w-full justify-center py-2.5 text-sm"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                {t('comparison.comparing')}
              </span>
            ) : t('comparison.compareButton')}
          </button>

          <p className="text-text-muted text-xs text-center mt-3">
            {t('comparison.helperText')}
          </p>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-center gap-3 text-sm font-semibold text-text-secondary">
                <span className="text-text-primary">{author1}</span>
                <span className="text-text-muted">vs</span>
                <span className="text-text-primary">{author2}</span>
              </div>

              <MatchPercentWidget
                percentage={result.percentage}
                commonCount={result.commonCount}
                hasEnoughData={result.hasEnoughData}
              />

              {!result.hasEnoughData && result.commonCount === 0 && (
                <EmptyState
                  icon="🤷"
                  title={t('comparison.noCommonTitle')}
                  description={t('comparison.noCommonDescription')}
                />
              )}

              <div className="grid gap-4">
                <Section
                  title={t('comparison.agreedTitle')}
                  emoji="❤️"
                  items={result.agreed.slice(0, 5)}
                  author1={author1}
                  author2={author2}
                  type="agreed"
                />
                <Section
                  title={t('comparison.list1LikedTitle', { author1, author2 })}
                  emoji="📈"
                  items={result.list1Liked.slice(0, 5)}
                  author1={author1}
                  author2={author2}
                  type="list1liked"
                />
                <Section
                  title={t('comparison.list2LikedTitle', { author1, author2 })}
                  emoji="📉"
                  items={result.list2Liked.slice(0, 5)}
                  author1={author1}
                  author2={author2}
                  type="list2liked"
                />
                <Section
                  title={t('comparison.disagreedTitle')}
                  emoji="⚡"
                  items={result.disagreed.slice(0, 5)}
                  author1={author1}
                  author2={author2}
                  type="disagreed"
                />
              </div>

              {result.commonCount > 0 && (
                <div className="glass rounded-xl p-4 text-center">
                  <div className="grid grid-cols-3 divide-x divide-border">
                    <div className="px-2">
                      <p className="text-text-primary font-extrabold text-xl">{result.list1Total}</p>
                      <p className="text-text-muted text-xs mt-0.5">
                        {t('comparison.listCountLabel', { author: author1 })}
                      </p>
                    </div>
                    <div className="px-2">
                      <p className="text-text-primary font-extrabold text-xl">{result.commonCount}</p>
                      <p className="text-text-muted text-xs mt-0.5">
                        {t('comparison.commonCountLabel')}
                      </p>
                    </div>
                    <div className="px-2">
                      <p className="text-text-primary font-extrabold text-xl">{result.list2Total}</p>
                      <p className="text-text-muted text-xs mt-0.5">
                        {t('comparison.listCountLabel', { author: author2 })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <Link to="/olustur" className="btn-secondary text-sm">
                  {t('comparison.ctaCreateYourOwn')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && !loading && (
          <EmptyState
            icon="🎯"
            title={t('comparison.comparePromptTitle')}
            description={t('comparison.comparePromptDescription')}
          />
        )}
      </div>
    </PageLayout>
  );
}
