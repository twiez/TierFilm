import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import PageLayout from '../components/layout/PageLayout';
import TierBoard from '../components/ui/TierBoard';
import StatsBadge, { TierDistBadge } from '../components/ui/StatsBadge';
import EmptyState from '../components/ui/EmptyState';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { decodeListData } from '../services/listStorage';
import { getTierStats } from '../utils/tierUtils';

export default function ViewListPage() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const boardRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      setLoading(true);
      const encoded = searchParams.get('d');
      if (encoded) {
        const data = await decodeListData(encoded);
        if (isMounted) setListData(data);
      }
      if (isMounted) setLoading(false);
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const stats = useMemo(() => {
    if (!listData) return null;
    return getTierStats({ tiers: listData.tiers });
  }, [listData]);

  const totalCount = useMemo(() => {
    if (!stats) return 0;
    return stats.reduce((acc, s) => acc + s.count, 0);
  }, [stats]);

  const topTier = useMemo(() => {
    if (!stats) return null;
    return stats.find((s) => s.count > 0);
  }, [stats]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCompare = () => {
    const encoded = searchParams.get('d');
    navigate(`/karsilastir?liste=${encoded || ''}`);
  };

  const handleExport = async () => {
    if (!boardRef.current) return;
    try {
      setIsExporting(true);
      await new Promise(r => setTimeout(r, 300));
      
      const dataUrl = await toPng(boardRef.current, { 
        quality: 1.0, 
        pixelRatio: 2,
        backgroundColor: '#08080f',
        useCORS: true,
        allowTaint: true
      });
      download(dataUrl, `tierfilm-${listData.listName || 'liste'}.png`);
    } catch (err) {
      console.error('Resim dışa aktarılamadı:', err);
      alert('Resim oluşturulurken bir hata oluştu.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!boardRef.current) return;
    try {
      setIsExporting(true);
      await new Promise(r => setTimeout(r, 300));
      
      const dataUrl = await toPng(boardRef.current, { 
        quality: 1.0, 
        pixelRatio: 2,
        backgroundColor: '#08080f',
        useCORS: true,
        allowTaint: true
      });
      
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `tierfilm-${listData?.listName || 'liste'}.png`, { type: 'image/png' });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${listData?.listName || 'Tier Listem'} - TierFilm`,
          text: 'Film ve dizi tier listeme göz at! 🎬',
          files: [file]
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `${listData?.listName || 'Tier Listem'} - TierFilm`,
          text: 'Film ve dizi tier listeme göz at! 🎬',
          url: window.location.href
        });
      } else {
        download(dataUrl, `tierfilm-${listData?.listName || 'liste'}.png`);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Paylaşım hatası:', err);
      }
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <LoadingSkeleton count={5} type="row" />
        </div>
      </PageLayout>
    );
  }

  if (!listData) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <EmptyState
            icon="🔍"
            title={t('view.notFoundTitle')}
            description={t('view.notFoundDescription')}
            action={
              <Link to="/olustur" className="btn-primary text-sm">
                {t('view.notFoundCta')}
              </Link>
            }
          />
        </div>
      </PageLayout>
    );
  }

  const formattedDate = new Date(listData.createdAt).toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="section-label mb-2">{t('view.sectionLabel')}</p>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="page-title mb-1">
                {listData.listName || t('view.untitledList')}
              </h1>
              <p className="text-text-muted text-sm">
                <span className="text-text-secondary font-medium">
                  {listData.authorName || t('view.anonymous')}
                </span>
                {' '} · {formattedDate}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button 
                onClick={handleExport} 
                disabled={isExporting}
                className="btn-secondary text-xs px-4 py-2"
              >
                {isExporting ? t('view.processingLabel') : t('view.downloadLabel')}
              </button>
              <button 
                onClick={handleShare} 
                disabled={isExporting}
                className="btn-secondary text-xs px-4 py-2"
              >
                {isExporting ? '⏳' : t('view.shareLabel')}
              </button>
              <button onClick={handleCopy} className="btn-secondary text-xs px-4 py-2">
                {copied ? t('view.copied') : t('view.linkLabel')}
              </button>
              <button onClick={handleCompare} className="btn-primary text-xs px-4 py-2">
                {t('view.compareLabel')}
              </button>
            </div>
          </div>
        </motion.div>

        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mb-6 flex flex-wrap gap-2 items-center"
          >
            <StatsBadge label={t('view.totalItems')} value={totalCount} icon="📊" />
            {topTier && topTier.count > 0 && (
              <StatsBadge
                label={t('view.sTierLabel')}
                value={`${topTier.count}`}
                icon="⭐"
                accent
              />
            )}
            <div className="flex gap-1.5 flex-wrap">
              {stats
                .filter((s) => s.count > 0)
                .map((s) => (
                  <TierDistBadge key={s.tier} tier={s.tier} count={s.count} />
                ))}
            </div>
          </motion.div>
        )}

        <motion.div
          ref={boardRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`pb-4 ${isExporting ? 'export-mode' : ''}`}
        >
          {/* Export sırasında logo görünmesi için ufak bir header */}
          <div className="hidden pb-6 mb-6 border-b border-white/5" style={{ display: isExporting ? 'block' : 'none' }}>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter" style={{ fontFamily: '"Noto Sans Mono", monospace' }}>
                  <span className="text-primary">TIER</span>
                  <span className="text-white">FİLM</span>
                </h2>
                <p className="text-base font-medium mt-1 text-white/70">
                  {listData.listName || t('view.untitledList')} <span className="text-white/40">by</span> {listData.authorName || t('view.anonymous')}
                </p>
              </div>
              <div className="flex items-end pb-1">
                <img src="/tier.png" alt="TierFilm" crossOrigin="anonymous" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
          
          <TierBoard
            tierList={{ tiers: listData.tiers, pool: [], settings: listData.settings }}
            viewOnly
          />
        </motion.div>

        {totalCount === 0 && (
          <EmptyState
            icon="🎬"
            title={t('view.noContentTitle')}
            description={t('view.noContentDescription')}
          />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 justify-center items-center text-center"
        >
          <p className="text-text-muted text-sm">{t('view.bottomCtaText')}</p>
          <Link to="/olustur" className="btn-primary text-sm px-5">
            {t('view.bottomCtaButton')}
          </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
}
