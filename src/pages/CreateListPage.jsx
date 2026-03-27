import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import PageLayout from '../components/layout/PageLayout';
import SearchBar from '../components/ui/SearchBar';
import PosterCard from '../components/ui/PosterCard';
import TierBoard from '../components/ui/TierBoard';
import EmptyState from '../components/ui/EmptyState';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { useSearch } from '../hooks/useSearch';
import { createEmptyTierList, addToTier, getTotalItems } from '../utils/tierUtils';
import { buildShareURL } from '../services/listStorage';
import CustomTiersModal from '../components/ui/CustomTiersModal';

export default function CreateListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { query, setQuery, results, isLoading } = useSearch();
  const [tierList, setTierList] = useState(createEmptyTierList);
  const [listName, setListName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareURL, setShareURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const boardRef = useRef(null);

  const totalItems = useMemo(() => getTotalItems(tierList), [tierList]);

  // Arama sonucundan havuza ekle
  const handleAddFromSearch = (item) => {
    // Zaten varsa ekleme
    const alreadyIn = Object.values(tierList.tiers).flat().some((i) => i.id === item.id)
      || tierList.pool.some((i) => i.id === item.id);
    if (alreadyIn) return;
    const updated = addToTier(tierList, item, null);
    setTierList(updated);
    setQuery('');
  };

  // Kaydet
  const handleSave = () => {
    if (totalItems === 0) return;
    const data = {
      listName: listName.trim() || t('create.untitledList'),
      authorName: authorName.trim() || t('create.anonymous'),
      tiers: tierList.tiers,
      settings: tierList.settings || null,
    };
    const url = buildShareURL(data);
    if (url) {
      setShareURL(url);
    } else {
      alert(t('create.savingLinkError'));
    }
  };

  // Linki kopyala
  const handleCopy = () => {
    if (!shareURL) return;
    navigator.clipboard.writeText(shareURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExport = async () => {
    if (!boardRef.current || totalItems === 0) return;
    try {
      setIsExporting(true);
      await new Promise(r => setTimeout(r, 300)); // let React apply export-mode class
      
      const dataUrl = await toPng(boardRef.current, { 
        quality: 1.0, 
        pixelRatio: 2,
        backgroundColor: '#08080f',
        useCORS: true,
        allowTaint: true
      });
      download(dataUrl, `tierfilm-${listName || 'liste'}.png`);
    } catch (err) {
      console.error('Resim dışa aktarılamadı:', err);
      alert(t('create.exportErrorImage'));
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!boardRef.current || totalItems === 0) return;
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
      
      // dataUrl -> blob -> File
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `tierfilm-${listName || 'liste'}.png`, { type: 'image/png' });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${listName || t('create.untitledList')}${t('create.shareTitleSuffix')}`,
          text: t('create.shareText'),
          files: [file]
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `${listName || t('create.untitledList')}${t('create.shareTitleSuffix')}`,
          text: t('create.shareText'),
          url: window.location.href
        });
      } else {
        // Fallback: just download
        download(dataUrl, `tierfilm-${listName || 'liste'}.png`);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Paylaşım hatası:', err);
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="section-label mb-2">{t('create.sectionLabel')}</p>
          <h1 className="page-title mb-4">{t('create.pageTitle')}</h1>

          {/* Liste adı ve isim */}
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder={t('create.listNamePlaceholder')}
              className="input"
              maxLength={60}
            />
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={t('create.authorNamePlaceholder')}
              className="input"
              maxLength={30}
            />
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-4"
        >
          <SearchBar
            query={query}
            onChange={setQuery}
              placeholder={t('create.searchPlaceholder')}
            isLoading={isLoading}
            autoFocus
          />
        </motion.div>

        {/* Arama sonuçları */}
        <AnimatePresence>
          {(results.length > 0 || (query.length >= 2 && !isLoading)) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              {results.length > 0 ? (
                <>
                  <p className="text-text-muted text-xs mb-2 font-medium">
                    {t('create.resultsLabel', { count: results.length })}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {results.map((item) => {
                      if (item.isWarning) {
                        return (
                          <div key={item.id} className="col-span-full mt-2">
                            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-center">
                              <span className="text-2xl mb-2 block">🔑</span>
                              <h3 className="text-amber-400 font-bold text-sm mb-1">
                                {t('create.tmdbWarningTitle')}
                              </h3>
                              <p className="text-text-secondary text-xs whitespace-pre-line">
                                {t('create.tmdbWarningDescription')}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      const alreadyIn =
                        Object.values(tierList.tiers).flat().some((i) => i.id === item.id) ||
                        tierList.pool.some((i) => i.id === item.id);
                      return (
                        <div key={item.id} className={`relative ${alreadyIn ? 'opacity-40 pointer-events-none' : ''}`}>
                          <PosterCard item={item} onClick={handleAddFromSearch} />
                          {alreadyIn && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                              <span className="text-xs text-white font-bold">✓</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                query.length >= 2 && !isLoading && (
                  <EmptyState
                    icon="🔍"
                    title={t('create.emptyResultsTitle')}
                    description={t('create.emptyResultsDescription', { query })}
                  />
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading skeleton */}
        {isLoading && query.length >= 2 && (
          <div className="mb-6">
            <LoadingSkeleton count={6} type="poster" />
          </div>
        )}

        {/* Tier board */}
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
                  {listName || 'İsimsiz Liste'} <span className="text-white/40">by</span> {authorName || 'Anonim'}
                </p>
              </div>
              <div className="flex items-end pb-1">
                <img src="/tier.png" alt="TierFilm" crossOrigin="anonymous" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3" style={{ display: isExporting ? 'none' : 'flex' }}>
            <div className="flex items-center gap-3">
              <p className="section-label mb-0">{t('create.tierBoardLabel')}</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
                title={t('create.editTiersTooltip')}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t('create.editButton')}
              </button>
            </div>
            {totalItems > 0 && (
              <span className="text-text-muted text-xs">
                {t('create.totalItemsLabel', { count: totalItems })}
              </span>
            )}
          </div>
          <TierBoard tierList={tierList} onChange={setTierList} />
          
          <CustomTiersModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            tierList={tierList}
            setTierList={setTierList}
          />
        </motion.div>

        {/* Kaydet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 sm:mt-8 flex flex-col gap-3"
        >
          {!shareURL ? (
            <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleSave}
                disabled={totalItems === 0}
                className={`btn-primary flex-[2] justify-center py-3 text-sm ${totalItems === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {t('create.saveAndLinkLabel')}
              </button>
              <button
                onClick={handleExport}
                disabled={totalItems === 0 || isExporting}
                className={`btn-secondary flex-1 justify-center py-3 text-sm ${totalItems === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {isExporting ? '⏳' : t('create.exportDownloadLabel')}
              </button>
              <button
                onClick={handleShare}
                disabled={totalItems === 0 || isExporting}
                className={`btn-secondary flex-1 justify-center py-3 text-sm ${totalItems === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {isExporting ? '⏳' : t('create.shareLabel')}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-2 p-3 rounded-xl border border-accent/30 bg-accent/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-accent-light animate-pulse-slow" />
                <span className="text-accent-light text-sm font-semibold">
                  {t('create.linkCreatedLabel')}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="btn-primary text-xs px-4 py-2 flex-1">
                  {copied ? t('create.copied') : t('create.copyLinkButton')}
                </button>
                <button
                  onClick={() => {
                    const encoded = new URL(shareURL).searchParams.get('d');
                    if (encoded) navigate(`/liste?d=${encoded}`);
                  }}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  {t('create.viewButton')}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
}
