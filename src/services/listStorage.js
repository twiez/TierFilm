import pako from 'pako';

import { DEFAULT_TIER_META, TIER_ORDER } from '../utils/tierUtils';

// Palette index mapping to shrink color strings
const COLOR_PALETTE = {
  '#ef4444': 1, '#f97316': 2, '#f59e0b': 3, '#10b981': 4,
  '#3b82f6': 5, '#a855f7': 6, '#ec4899': 7, '#9ca3af': 8
};
const PALETTE_REVERSE = Object.fromEntries(Object.entries(COLOR_PALETTE).map(([k, v]) => [v, k]));

function compressSettings(settings) {
  if (!settings) return null;
  const compressed = {};
  let hasChanges = false;

  TIER_ORDER.forEach(t => {
    const s = settings[t];
    const def = DEFAULT_TIER_META[t] || DEFAULT_TIER_META['C'];
    if (!s) return;
    
    // Yalnızca değişenleri kaydet
    const isCustomLabel = s.label !== def.label;
    const isCustomColor = s.color !== def.color;
    
    if (isCustomLabel || isCustomColor) {
      compressed[t] = {};
      if (isCustomLabel) compressed[t].l = s.label;
      if (isCustomColor) compressed[t].c = COLOR_PALETTE[s.color] || s.color;
      hasChanges = true;
    }
  });
  
  return hasChanges ? compressed : null;
}

// Liste verisi → sıkıştırılmış URL-safe base64 string
export function encodeListData(listData) {
  try {
    // Sadece gerekli verileri al (boyutu küçültmek için)
    const minimal = {
      n: listData.listName || 'İsimsiz Liste',
      a: listData.authorName || 'Anonim',
      t: {},
      s: compressSettings(listData.settings),
      d: new Date().toISOString().split('T')[0] // sadece tarih
    };

    // Tier verisini sıkıştır: sadece id, title, poster_path, media_type tut
    const TIER_KEYS = ['S', 'A', 'B', 'C', 'D'];
    TIER_KEYS.forEach(tier => {
      const items = listData.tiers?.[tier] || [];
      if (items.length > 0) {
        minimal.t[tier] = items.map(item => {
          const minimalItem = { i: item.id };
          if (item.media_type === 'tv') minimalItem.m = 1; // 1 = tv, yoksa movie
          return minimalItem;
        });
      }
    });

    const json = JSON.stringify(minimal);
    // Sıkıştır
    const compressed = pako.deflate(json);
    // Uint8Array → base64
    const base64 = btoa(String.fromCharCode.apply(null, compressed));
    // URL-safe base64
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Encode hatası:', e);
    return null;
  }
}

import { fetchMediaDetails } from './mockData';

// Helper: hex to rgba
function hexToRgba(hex, alpha) {
  if (!hex || !hex.startsWith('#')) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Helper: text color class
function getTextColorClass(hex) {
  const map = {
    '#ef4444': 'text-red-400', '#f97316': 'text-orange-400', '#f59e0b': 'text-amber-400',
    '#10b981': 'text-emerald-400', '#3b82f6': 'text-blue-400', '#a855f7': 'text-purple-400',
    '#ec4899': 'text-pink-400', '#9ca3af': 'text-gray-400'
  };
  return map[hex] || 'text-white';
}

function expandSettings(compressed) {
  if (!compressed) return null;
  const expanded = { ...DEFAULT_TIER_META };
  
  Object.entries(compressed).forEach(([t, data]) => {
    expanded[t] = { ...expanded[t] };
    if (data.l) expanded[t].label = data.l;
    if (data.c) {
      const hex = PALETTE_REVERSE[data.c] || data.c;
      expanded[t].color = hex;
      expanded[t].bg = hexToRgba(hex, 0.15);
      expanded[t].border = hexToRgba(hex, 0.4);
      expanded[t].text = getTextColorClass(hex);
    }
  });
  
  return expanded;
}

// URL-safe base64 → liste verisi
export async function decodeListData(encoded) {
  try {
    if (!encoded) return null;
    // URL-safe base64 → normal base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Padding ekle
    while (base64.length % 4) base64 += '=';
    // base64 → Uint8Array
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    // Decompress
    const json = pako.inflate(bytes, { to: 'string' });
    const minimal = JSON.parse(json);

    // Tam veri formatına geri dönüştür
    const tiers = { S: [], A: [], B: [], C: [], D: [] };
    const allItemsToFetch = [];

    Object.entries(minimal.t || {}).forEach(([tier, items]) => {
      items.forEach(item => {
        allItemsToFetch.push({
          id: item.i,
          media_type: item.m === 1 ? 'tv' : 'movie',
          _targetTier: tier // Geçici olarak hangi tier'da olduğunu sakla
        });
      });
    });

    // TMDB'den eksik detayları çek
    const enrichedItems = await fetchMediaDetails(allItemsToFetch);

    // Düzgün tier'lara yerleştir
    enrichedItems.forEach((item, index) => {
      const originalInfo = allItemsToFetch[index];
      tiers[originalInfo._targetTier].push(item);
    });

    return {
      listName: minimal.n,
      authorName: minimal.a,
      tiers,
      settings: expandSettings(minimal.s),
      createdAt: minimal.d
    };
  } catch (e) {
    console.error('Decode hatası:', e);
    return null;
  }
}

// Paylaşım URL'i üret
export function buildShareURL(listData) {
  const encoded = encodeListData(listData);
  if (!encoded) return null;
  return `${window.location.origin}/liste?d=${encoded}`;
}

// ====== Geriye dönük uyumluluk için localStorage fonksiyonları ======
const STORAGE_KEY = 'tierfilm_lists';

export function saveListLocal(listData) {
  const id = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  const entry = { id, createdAt: new Date().toISOString(), ...listData };
  try {
    const existing = getAllLocalLists();
    existing[id] = entry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return id;
  } catch (e) {
    console.error('Liste kaydedilemedi:', e);
    return null;
  }
}

export function getLocalList(id) {
  try {
    const all = getAllLocalLists();
    return all[id] || null;
  } catch {
    return null;
  }
}

export function getAllLocalLists() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
