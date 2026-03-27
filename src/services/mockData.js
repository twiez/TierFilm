// Mock film ve dizi verisi — TMDb API yapısıyla uyumlu
// Gerçek API entegrasyonu için bu servisi swap edebilirsiniz

export const MOCK_MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    media_type: "movie",
    release_date: "2014-11-05",
    poster_path: "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    genre_ids: [12, 18, 878],
    genres: ["Macera", "Drama", "Bilim Kurgu"],
    vote_average: 8.4,
    overview: "Dünya'nın geleceği tehlikede olan bir grupla birlikte astronot Cooper, insanlığı kurtarabilecek yeni bir dünya aramak için uzaya gider.",
  },
  {
    id: 2,
    title: "Inception",
    media_type: "movie",
    release_date: "2010-07-16",
    poster_path: "https://image.tmdb.org/t/p/w342/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    genre_ids: [28, 12, 878],
    genres: ["Aksiyon", "Macera", "Bilim Kurgu"],
    vote_average: 8.4,
    overview: "Zihin hırsızı Dom Cobb, hedeflerinin rüyalarına girerek değerli sırları çalmada eşsizdir.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    media_type: "movie",
    release_date: "2008-07-18",
    poster_path: "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    genre_ids: [28, 80, 18],
    genres: ["Aksiyon", "Suç", "Drama"],
    vote_average: 9.0,
    overview: "Batman, Joker olarak bilinen kötü adam tarafından yaratılan kaosa karşı dur.",
  },
  {
    id: 4,
    title: "Parasite",
    media_type: "movie",
    release_date: "2019-11-08",
    poster_path: "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    genre_ids: [35, 18, 53],
    genres: ["Komedi", "Drama", "Gerilim"],
    vote_average: 8.5,
    overview: "Tüm ailesi işsiz olan Ki-taek, zengin Park ailesinin yanına işe girer.",
  },
  {
    id: 5,
    title: "Oppenheimer",
    media_type: "movie",
    release_date: "2023-07-21",
    poster_path: "https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    genre_ids: [18, 36],
    genres: ["Drama", "Tarih"],
    vote_average: 8.3,
    overview: "J. Robert Oppenheimer'ın atom bombasını geliştirmesini konu alan bir biyografi.",
  },
  {
    id: 6,
    title: "Dune",
    media_type: "movie",
    release_date: "2021-10-22",
    poster_path: "https://image.tmdb.org/t/p/w342/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    genre_ids: [12, 18, 878],
    genres: ["Macera", "Drama", "Bilim Kurgu"],
    vote_average: 7.9,
    overview: "Paul Atreides olarak bilinen genç bir deha, kendi kaderinin ve halkının koruyucusu olmak için bir yolculuğa çıkar.",
  },
  {
    id: 7,
    title: "The Godfather",
    media_type: "movie",
    release_date: "1972-03-24",
    poster_path: "https://image.tmdb.org/t/p/w342/3bhkrj58Vtu7enYsLLeHBMRHANe.jpg",
    genre_ids: [80, 18],
    genres: ["Suç", "Drama"],
    vote_average: 9.2,
    overview: "Yaşlı Don Corleone, organizasyonu için uyuşturucu satışına girmeyi reddetmesinin ardından suikaste uğrar.",
  },
  {
    id: 8,
    title: "Pulp Fiction",
    media_type: "movie",
    release_date: "1994-10-14",
    poster_path: "https://image.tmdb.org/t/p/w342/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    genre_ids: [80, 18],
    genres: ["Suç", "Drama"],
    vote_average: 8.9,
    overview: "Birbirine bağlı, suç, gerilim ve kara komedi içeren hikayeler.",
  },
  {
    id: 9,
    title: "Fight Club",
    media_type: "movie",
    release_date: "1999-10-15",
    poster_path: "https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    genre_ids: [18],
    genres: ["Drama"],
    vote_average: 8.8,
    overview: "İsimsiz anlatıcı, sabun satıcısı Tyler Durden ile tanışır ve birlikte gizli bir dövüş kulübü kurar.",
  },
  {
    id: 10,
    title: "Whiplash",
    media_type: "movie",
    release_date: "2014-10-15",
    poster_path: "https://image.tmdb.org/t/p/w342/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    genre_ids: [18, 10402],
    genres: ["Drama", "Müzik"],
    vote_average: 8.5,
    overview: "Genç ve yetenekli bir davulcu, zorlu bir müzik öğretmeniyle çalışmaya başlar.",
  },
  {
    id: 11,
    title: "Breaking Bad",
    media_type: "tv",
    release_date: "2008-01-20",
    poster_path: "https://image.tmdb.org/t/p/w342/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    genre_ids: [18, 80],
    genres: ["Drama", "Suç"],
    vote_average: 9.5,
    overview: "Kimya öğretmeni Walter White, terminal kanser tanısı aldıktan sonra hayatını değiştirir.",
  },
  {
    id: 12,
    title: "Chernobyl",
    media_type: "tv",
    release_date: "2019-05-06",
    poster_path: "https://image.tmdb.org/t/p/w342/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    genre_ids: [18],
    genres: ["Drama", "Tarih"],
    vote_average: 9.4,
    overview: "1986 Chernobyl nükleer felaketi ve ardından yaşanan olayların çarpıcı hikayesi.",
  },
  {
    id: 13,
    title: "Dark",
    media_type: "tv",
    release_date: "2017-12-01",
    poster_path: "https://image.tmdb.org/t/p/w342/apbrbWs8M9lyOpJYU5OENHVOwY.jpg",
    genre_ids: [18, 9648, 878],
    genres: ["Drama", "Gizem", "Bilim Kurgu"],
    vote_average: 8.8,
    overview: "Almanya'nın küçük bir kasabasında çocukların kaybolmasıyla başlayan gizem, zaman yolculuğu sırlarını ortaya çıkarır.",
  },
  {
    id: 14,
    title: "Succession",
    media_type: "tv",
    release_date: "2018-06-03",
    poster_path: "https://image.tmdb.org/t/p/w342/e2X8INFHNOqSSB8ibfcJF89KHYE.jpg",
    genre_ids: [18],
    genres: ["Drama"],
    vote_average: 8.8,
    overview: "Roy ailesi bir medya imparatorluğuna sahiptir. Güç mücadelesi aile içini paramparça eder.",
  },
  {
    id: 15,
    title: "Fleabag",
    media_type: "tv",
    release_date: "2016-07-21",
    poster_path: "https://image.tmdb.org/t/p/w342/7jV4F4L2tRf3cYLN3Nq9ORwGnpq.jpg",
    genre_ids: [35, 18],
    genres: ["Komedi", "Drama"],
    vote_average: 8.7,
    overview: "Londra'da yaşayan bir kadının hayatını ve içindeki melankoliyi mizahi bir gözle anlatan dizi.",
  },
  {
    id: 16,
    title: "The Wire",
    media_type: "tv",
    release_date: "2002-06-02",
    poster_path: "https://image.tmdb.org/t/p/w342/4lAJaQRCbSzxGhEBDJ6gQaFZoXP.jpg",
    genre_ids: [80, 18],
    genres: ["Suç", "Drama"],
    vote_average: 9.3,
    overview: "Baltimore'un suç dünyasını polis, suçlular ve medya açısından ele alan dizi.",
  },
  {
    id: 17,
    title: "Squid Game",
    media_type: "tv",
    release_date: "2021-09-17",
    poster_path: "https://image.tmdb.org/t/p/w342/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    genre_ids: [28, 18, 9648],
    genres: ["Aksiyon", "Drama", "Gizem"],
    vote_average: 7.9,
    overview: "Borçlu insanlar hayatta kalmak için çocuk oyunlarından oluşan ölüm oyunlarına katılmak zorunda kalır.",
  },
  {
    id: 18,
    title: "The Bear",
    media_type: "tv",
    release_date: "2022-06-23",
    poster_path: "https://image.tmdb.org/t/p/w342/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",
    genre_ids: [35, 18],
    genres: ["Komedi", "Drama"],
    vote_average: 8.6,
    overview: "Şef Carmy, ağabeyinin ölümünün ardından Chicago'da bir sandviç dükkanı işletmek zorunda kalır.",
  },
  {
    id: 19,
    title: "Blade Runner 2049",
    media_type: "movie",
    release_date: "2017-10-06",
    poster_path: "https://image.tmdb.org/t/p/w342/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    genre_ids: [878, 18, 9648],
    genres: ["Bilim Kurgu", "Drama", "Gizem"],
    vote_average: 8.0,
    overview: "Yeni nesil Blade Runner Officer K, onlarca yıllık bir sırrı ortaya çıkarır.",
  },
  {
    id: 20,
    title: "Mad Max: Fury Road",
    media_type: "movie",
    release_date: "2015-05-15",
    poster_path: "https://image.tmdb.org/t/p/w342/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    genre_ids: [28, 12, 878],
    genres: ["Aksiyon", "Macera", "Bilim Kurgu"],
    vote_average: 8.1,
    overview: "Apokaliptik bir çöl dünyasında, zorba bir hükümdardan kaçan bir grup ve Max'in hikayesi.",
  },
  {
    id: 21,
    title: "Everything Everywhere All at Once",
    media_type: "movie",
    release_date: "2022-03-25",
    poster_path: "https://image.tmdb.org/t/p/w342/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    genre_ids: [28, 12, 35, 18, 878],
    genres: ["Aksiyon", "Macera", "Komedi", "Drama", "Bilim Kurgu"],
    vote_average: 7.9,
    overview: "Çok evren teorisini kullanarak evreni kurtarmaya çalışan orta yaşlı bir kadının hikayesi.",
  },
  {
    id: 22,
    title: "The Social Network",
    media_type: "movie",
    release_date: "2010-10-01",
    poster_path: "https://image.tmdb.org/t/p/w342/n0ybibhJtQ5icDqTp8eRytcIHso.jpg",
    genre_ids: [18],
    genres: ["Drama"],
    vote_average: 7.8,
    overview: "Mark Zuckerberg'in Facebook'u kurma ve büyütmedeki hikayesi.",
  },
  {
    id: 23,
    title: "Severance",
    media_type: "tv",
    release_date: "2022-02-18",
    poster_path: "https://image.tmdb.org/t/p/w342/nOJpCHuJNHEA3plkEpj9jQ6Zd2p.jpg",
    genre_ids: [18, 9648, 878],
    genres: ["Drama", "Gizem", "Bilim Kurgu"],
    vote_average: 8.7,
    overview: "Bir şirket çalışanları iş ve özel hayat anılarını birbirinden ayıran bir cerrahi prosedürden geçer.",
  },
  {
    id: 24,
    title: "House of the Dragon",
    media_type: "tv",
    release_date: "2022-08-21",
    poster_path: "https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    genre_ids: [10759, 10765, 18],
    genres: ["Aksiyon", "Fantastik", "Drama"],
    vote_average: 8.4,
    overview: "Targaryen hanedanının çöküşünü anlatan Game of Thrones öncesine ait hikaye.",
  },
  {
    id: 25,
    title: "Shogun",
    media_type: "tv",
    release_date: "2024-02-27",
    poster_path: "https://image.tmdb.org/t/p/w342/7O4iVfOMQmdCSxhOg0WnCpjMFDl.jpg",
    genre_ids: [18, 10759],
    genres: ["Drama", "Aksiyon"],
    vote_average: 8.8,
    overview: "16. yüzyıl Japonya'sında bir İngiliz denizcinin güce yükselişini anlatan epik dizi.",
  },
];

// Film arama fonksiyonu
export async function searchMedia(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey || apiKey === 'BURAYA_KEY_GELECEK') {
    const isDizi = q === 'dizi' || q === 'diziler';
    const isFilm = q === 'film' || q === 'filmler';

    const localResults = MOCK_MOVIES.filter((m) => {
      if (isDizi) return m.media_type === 'tv';
      if (isFilm) return m.media_type === 'movie';
      return m.title.toLowerCase().includes(q);
    }).slice(0, 12);

    if (localResults.length === 0) {
      return [{ id: 'mock-warning', isWarning: true, title: 'Gerçek API Bağlantısı Gerekli' }];
    }
    return localResults;
  }

  // Gerçek TMDb API araması
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=tr-TR&query=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error('API yanıt vermedi');
    const data = await res.json();
    
    return data.results
      .filter((item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path)
      .map((item) => ({
        id: item.id,
        title: item.title || item.name,
        media_type: item.media_type,
        release_date: item.release_date || item.first_air_date,
        poster_path: item.poster_path, // getPosterUrl zaten bunu işliyor
        vote_average: item.vote_average,
      }))
      .slice(0, 12);
  } catch (error) {
    console.error('TMDb arama hatası:', error);
    return [];
  }
}

// Belirli ID'lerin detaylarını getir (URL kısaltması için)
export async function fetchMediaDetails(items) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey || apiKey === 'BURAYA_KEY_GELECEK') {
    // API yoksa, elimizde ne varsa onunla devam et (local mock)
    return items.map(item => {
      const mock = MOCK_MOVIES.find(m => m.id === Number(item.id));
      if (mock) return { ...item, ...mock };
      return item; // Fallback: sadece ID ve title gosterir
    });
  }

  // API ile her birinin detayını çek
  const fetchPromises = items.map(async (item) => {
    try {
      const type = item.media_type === 'tv' ? 'tv' : 'movie';
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${item.id}?api_key=${apiKey}&language=tr-TR`);
      if (!res.ok) return item; // Hata durumunda eldeki minimal veriyi dondur
      const data = await res.json();
      return {
        id: data.id,
        title: data.title || data.name,
        media_type: type,
        release_date: data.release_date || data.first_air_date,
        poster_path: data.poster_path, // getPosterUrl halledecek
        vote_average: data.vote_average,
      };
    } catch {
      return item;
    }
  });

  return Promise.all(fetchPromises);
}

// Poster URL helper (TMDb sunucusundaki güvenlik ve CORS sorunlarını aşmak için proxy kullanıyoruz)
export function getPosterUrl(path) {
  if (!path) return null;
  const targetUrl = path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w342${path}`;
  // Benzersiz parametre (path hash'i), html-to-image kütüphanesinin önbellek karmaşasını engeller (Aynı resmin diğerlerinde çıkma hatası)
  const uniqueBuster = Array.from(path).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://wsrv.nl/?url=${encodeURIComponent(targetUrl)}&cors=1&uid=${uniqueBuster}`;
}

// Belirli ID'ye göre film getir
export function getMediaById(id) {
  return MOCK_MOVIES.find((m) => m.id === Number(id)) || null;
}

// Yayın yılı helper
export function getReleaseYear(dateStr) {
  if (!dateStr) return '';
  return dateStr.split('-')[0];
}
