import { TIER_SCORES, TIER_ORDER } from '../utils/tierUtils';

/**
 * İki tier listesi arasındaki zevk uyumunu hesapla.
 * @param {Object} list1 - { tiers: {S:[], A:[], ...}, authorName }
 * @param {Object} list2 - { tiers: {S:[], A:[], ...}, authorName }
 * @returns {Object} comparison result
 */
export function calculateCompatibility(list1, list2) {
  // Her iki listede de olan içerikleri bul
  const list1Items = {};
  const list2Items = {};

  TIER_ORDER.forEach((tier) => {
    (list1.tiers[tier] || []).forEach((item) => {
      list1Items[item.id] = { item, tier, score: TIER_SCORES[tier] };
    });
    (list2.tiers[tier] || []).forEach((item) => {
      list2Items[item.id] = { item, tier, score: TIER_SCORES[tier] };
    });
  });

  const commonIds = Object.keys(list1Items).filter((id) => list2Items[id]);

  if (commonIds.length === 0) {
    return {
      percentage: 0,
      commonCount: 0,
      maxPossibleDiff: 4,
      avgDiff: 4,
      agreed: [],
      disagreed: [],
      list1Liked: [],
      list2Liked: [],
      hasEnoughData: false,
    };
  }

  let totalDiff = 0;
  const agreed = [];
  const disagreed = [];
  const list1Liked = [];
  const list2Liked = [];

  commonIds.forEach((id) => {
    const e1 = list1Items[id];
    const e2 = list2Items[id];
    const diff = Math.abs(e1.score - e2.score);
    totalDiff += diff;

    const entry = {
      item: e1.item,
      tier1: e1.tier,
      tier2: e2.tier,
      score1: e1.score,
      score2: e2.score,
      diff,
    };

    if (diff <= 1) {
      agreed.push(entry);
    } else {
      disagreed.push(entry);
      if (e1.score > e2.score) {
        list1Liked.push(entry);
      } else {
        list2Liked.push(entry);
      }
    }
  });

  const maxDiff = 4; // maks puan farkı (S=5, D=1)
  const avgDiff = totalDiff / commonIds.length;
  // Yüzde hesabı: avgDiff ne kadar düşükse uyum o kadar yüksek
  const percentage = Math.round(((maxDiff - avgDiff) / maxDiff) * 100);

  return {
    percentage: Math.max(0, Math.min(100, percentage)),
    commonCount: commonIds.length,
    avgDiff: Math.round(avgDiff * 10) / 10,
    agreed: agreed.sort((a, b) => a.diff - b.diff),
    disagreed: disagreed.sort((a, b) => b.diff - a.diff),
    list1Liked: list1Liked.sort((a, b) => b.diff - a.diff),
    list2Liked: list2Liked.sort((a, b) => b.diff - a.diff),
    hasEnoughData: commonIds.length >= 3,
    list1Total: Object.keys(list1Items).length,
    list2Total: Object.keys(list2Items).length,
  };
}

// Uyum yüzdesine göre metin üret
export function getCompatibilityLabel(percentage) {
  if (percentage >= 90) return { label: 'Mükemmel Uyum', color: '#10b981' };
  if (percentage >= 75) return { label: 'Çok İyi Uyum', color: '#34d399' };
  if (percentage >= 60) return { label: 'İyi Uyum', color: '#a3e635' };
  if (percentage >= 45) return { label: 'Orta Uyum', color: '#fbbf24' };
  if (percentage >= 30) return { label: 'Zayıf Uyum', color: '#f97316' };
  return { label: 'Çok Farklı Zevkler', color: '#ef4444' };
}
