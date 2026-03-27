// Varsayılan Tier puanları ve sırası
export const TIER_SCORES = { S: 5, A: 4, B: 3, C: 2, D: 1 };
export const TIER_ORDER = ['S', 'A', 'B', 'C', 'D'];

export const DEFAULT_TIER_META = {
  S: { id: 'S', label: 'S', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', text: 'text-amber-400' },
  A: { id: 'A', label: 'A', color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', text: 'text-emerald-400' },
  B: { id: 'B', label: 'B', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', text: 'text-blue-400' },
  C: { id: 'C', label: 'C', color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)', text: 'text-orange-400' },
  D: { id: 'D', label: 'D', color: '#ef4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: 'text-red-400' },
};

// Boş tier listesi oluştur (artık settings de içeriyor)
export function createEmptyTierList() {
  const tiers = {};
  TIER_ORDER.forEach((t) => (tiers[t] = []));
  return { 
    tiers, 
    pool: [],
    settings: { ...DEFAULT_TIER_META }
  };
}

// Belirli bir tier'ın meta verisini getir (custom varsa onu, yoksa default'u kullanır)
export function getTierMeta(tierList, tierId) {
  if (tierList?.settings?.[tierId]) {
    return tierList.settings[tierId];
  }
  return DEFAULT_TIER_META[tierId] || DEFAULT_TIER_META['C'];
}

// Tüm tier ID'lerini sırasıyla getir
export function getTierOrder(tierList) {
  // Gelecekte sıra değiştirme eklenirse buradan okunur
  return TIER_ORDER;
}

// Item'ı tier listesine ekle
export function addToTier(tierList, item, tierId) {
  const newTiers = { ...tierList.tiers };
  // Önce tüm tier'lardan ve pool'dan çıkar
  TIER_ORDER.forEach((t) => {
    newTiers[t] = newTiers[t].filter((i) => i.id !== item.id);
  });
  const newPool = tierList.pool.filter((i) => i.id !== item.id);

  if (tierId) {
    newTiers[tierId] = [...newTiers[tierId], item];
    return { ...tierList, tiers: newTiers, pool: newPool };
  } else {
    return { ...tierList, tiers: newTiers, pool: [...newPool, item] };
  }
}

// Item'ı tier'dan çıkarıp havuza at
export function removeFromTier(tierList, itemId) {
  const newTiers = { ...tierList.tiers };
  let removedItem = null;

  TIER_ORDER.forEach((t) => {
    const idx = newTiers[t].findIndex((i) => i.id === itemId);
    if (idx !== -1) {
      removedItem = newTiers[t][idx];
      newTiers[t] = newTiers[t].filter((i) => i.id !== itemId);
    }
  });

  if (removedItem) {
    return { ...tierList, tiers: newTiers, pool: [...tierList.pool, removedItem] };
  }
  return tierList;
}

// item hangi tier'da?
export function getItemTier(tierList, itemId) {
  for (const tier of TIER_ORDER) {
    if (tierList.tiers[tier]?.some((i) => i.id === itemId)) return tier;
  }
  return null;
}

// Tier listesindeki toplam içerik sayısı
export function getTotalItems(tierList) {
  return (
    TIER_ORDER.reduce((acc, t) => acc + (tierList.tiers[t]?.length || 0), 0) +
    (tierList.pool?.length || 0)
  );
}

// En yüksek tier'daki içerikler
export function getTopItems(tierList, count = 3) {
  for (const tier of TIER_ORDER) {
    if (tierList.tiers[tier]?.length >= count) {
      return tierList.tiers[tier].slice(0, count);
    }
  }
  // En az birkaç var ise
  for (const tier of TIER_ORDER) {
    if (tierList.tiers[tier]?.length > 0) {
      return tierList.tiers[tier];
    }
  }
  return [];
}

// Tier istatistikleri
export function getTierStats(tierList) {
  return TIER_ORDER.map((t) => ({
    tier: t,
    count: tierList.tiers[t]?.length || 0,
    meta: getTierMeta(tierList, t),
  }));
}

