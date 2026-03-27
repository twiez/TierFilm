import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        brandPrimary: "TIER",
        brandSecondary: "FILM",
        beta: "beta",
        createList: "Create List",
        compare: "Compare",
        newList: "New List",
        openMenu: "Open menu",
      },
      language: {
        en: "EN",
        tr: "TR",
        switchLabel: "Change language",
      },
      home: {
        badge: "Movie & Series Tier Lists",
        heroTitleLine1: "Rank your taste.",
        heroTitleLine2: "Share.",
        heroTitleLine3: "Compare.",
        heroDescription:
          "Create your movie and series tier list in minutes, share it with a link and discover how much your taste matches with friends.",
        ctaCreate: "🎬 Create List",
        ctaCompare: "🤝 Compare Lists",
        howItWorksLabel: "How it works?",
        howItWorksTitle: "Everything in three steps",
        previewListName: "my-list",
        previewEmpty: "empty",
        compatMatchHeading: "Taste Match",
        compatFromItems: "based on 14 shared titles",
        compatAgree: "You agreed on",
        compatDisagree: "You disagreed on",
      },
      features: {
        create: {
          title: "Create your own list",
          description:
            "Search movies and series and rank them from S to D. Build your tier list in minutes.",
        },
        share: {
          title: "Share with a link",
          description:
            "Show your list to everyone with a single link. No account required.",
        },
        compare: {
          title: "Compare with a friend",
          description:
            "Put two lists side by side and instantly see your shared taste percentage.",
        },
      },
      create: {
        sectionLabel: "New List",
        pageTitle: "Create Your Tier List",
        listNamePlaceholder: "List name (optional)",
        authorNamePlaceholder: "Your name (optional)",
        searchPlaceholder: "Search a movie or series...",
        resultsLabel: "{{count}} results — click to add to list",
        tmdbWarningTitle: "API key required",
        tmdbWarningDescription:
          "To find all series and movies (e.g. Stranger Things) you need a TMDB API key.\nAdd your own free API key to the .env file in the project folder.",
        emptyResultsTitle: "No results found",
        emptyResultsDescription: 'No movies or series found for "{{query}}".',
        tierBoardLabel: "Tier Board",
        editTiersTooltip: "Edit Tier Names and Colors",
        editButton: "Edit",
        totalItemsLabel: "{{count}} items",
        exportErrorImage: "An error occurred while creating the image.",
        exportDownloadLabel: "📸 Download",
        shareLabel: "📱 Share",
        saveAndLinkLabel: "💾 Save and Get Link",
        linkCreatedLabel: "Link Created!",
        copyLinkButton: "🔗 Copy Link",
        copied: "✓ Copied!",
        viewButton: "View →",
        savingLinkError: "An error occurred while generating the link.",
        untitledList: "Untitled List",
        anonymous: "Anonymous",
        shareTitleSuffix: " - TierFilm",
        shareText: "Check out my movie & series tier list! 🎬",
      },
      tiers: {
        modalTitle: "Edit Tiers",
        cancel: "Cancel",
        save: "Save",
        unsortedTitle: "UNSORTED",
        searchHint: "Use search to add a movie or series",
      },
      comparison: {
        sectionLabel: "Comparison",
        pageTitle: "Taste Match",
        description:
          "Compare two tier lists and discover how much your taste overlaps.",
        firstListLabel: "Paste 1st list link",
        secondListLabel: "Paste 2nd list link",
        inputPlaceholder: "Paste list link...",
        errorBothRequired: "Please enter two lists.",
        errorBothInvalid:
          "Neither list could be decoded. Please check that the links are valid.",
        errorFirstInvalid: "The first list could not be decoded.",
        errorSecondInvalid: "The second list could not be decoded.",
        comparing: "Comparing...",
        compareButton: "🤝 Compare",
        helperText: "Paste the links of the two lists you want to compare.",
        noCommonTitle: "No shared titles",
        noCommonDescription:
          "These two lists have no movies or series in common. Try adding more titles.",
        agreedTitle: "Titles you agreed on the most",
        list1LikedTitle: "{{author1}} loved, {{author2}} rated low",
        list2LikedTitle: "{{author2}} loved, {{author1}} rated low",
        disagreedTitle: "Titles you disagreed on the most",
        commonCountLabel: "Shared titles",
        listCountLabel: "{{author}}'s list",
        ctaCreateYourOwn: "Create your own list →",
        comparePromptTitle: "Compare two lists",
        comparePromptDescription:
          "Enter list links or IDs to see how much your tastes match.",
      },
      view: {
        loadingSkeletonLabel: "Loading list...",
        notFoundTitle: "List not found",
        notFoundDescription:
          "This link is invalid or the list may have been removed.",
        notFoundCta: "Create New List",
        sectionLabel: "Tier List",
        untitledList: "Untitled List",
        anonymous: "Anonymous",
        downloadLabel: "📸 Download",
        processingLabel: "⏳ Processing...",
        shareLabel: "📱 Share",
        linkLabel: "🔗 Link",
        copied: "✓ Copied",
        compareLabel: "🤝 Compare",
        totalItems: "Total Titles",
        sTierLabel: "Most titles in S tier",
        noContentTitle: "This list has no titles",
        noContentDescription:
          "The list was created but no titles have been added yet.",
        bottomCtaText: "Want to create your own tier list?",
        bottomCtaButton: "🎬 Create List",
        exportErrorImage: "An error occurred while creating the image.",
      },
      shared: {
        listNotFound: "List not found",
        genericImageError: "An error occurred while creating the image.",
      },
    },
  },
  tr: {
    translation: {
      nav: {
        brandPrimary: "TIER",
        brandSecondary: "FİLM",
        beta: "beta",
        createList: "Liste Oluştur",
        compare: "Karşılaştır",
        newList: "Yeni Liste",
        openMenu: "Menüyü aç",
      },
      language: {
        en: "EN",
        tr: "TR",
        switchLabel: "Dili değiştir",
      },
      home: {
        badge: "Film & Dizi Tier Listeleri",
        heroTitleLine1: "Zevkini sırala.",
        heroTitleLine2: "Paylaş.",
        heroTitleLine3: "Karşılaştır.",
        heroDescription:
          "Film ve dizi tier listeni dakikalar içinde oluştur, linkle paylaş ve arkadaşınla zevk uyumunu keşfet.",
        ctaCreate: "🎬 Liste Oluştur",
        ctaCompare: "🤝 Listeleri Karşılaştır",
        howItWorksLabel: "Nasıl çalışır?",
        howItWorksTitle: "Üç adımda her şey",
        previewListName: "benim-listem",
        previewEmpty: "boş",
        compatMatchHeading: "Zevk Uyumu",
        compatFromItems: "14 ortak yapım üzerinden",
        compatAgree: "Anlaştınız",
        compatDisagree: "Ayrıştınız",
      },
      features: {
        create: {
          title: "Kendi listeni oluştur",
          description:
            "Film ve dizi arayıp S'ten D'ye sırala. Tier listeni dakikalar içinde hazırla.",
        },
        share: {
          title: "Link ile paylaş",
          description:
            "Listeni tek tıkla kopyalanan bir linkle herkese göster. Hesap gerekmez.",
        },
        compare: {
          title: "Arkadaşınla karşılaştır",
          description:
            "İki listeyi yan yana getir, ortak zevk oranını hemen gör.",
        },
      },
      create: {
        sectionLabel: "Yeni Liste",
        pageTitle: "Tier Listeni Oluştur",
        listNamePlaceholder: "Liste adı (opsiyonel)",
        authorNamePlaceholder: "İsmin (opsiyonel)",
        searchPlaceholder: "Film veya dizi ara...",
        resultsLabel: "{{count}} sonuç — tıklayarak listeye ekle",
        tmdbWarningTitle: "API anahtarı gerekli",
        tmdbWarningDescription:
          "Tüm dizi ve filmleri (örn. Stranger Things) bulabilmek için TMDB API gereklidir.\nProje dizinindeki .env dosyasına kendi ücretsiz API anahtarınızı ekleyin.",
        emptyResultsTitle: "Sonuç bulunamadı",
        emptyResultsDescription:
          '"{{query}}" için herhangi bir film veya dizi bulunamadı.',
        tierBoardLabel: "Tier Board",
        editTiersTooltip: "Tier İsimlerini ve Renklerini Düzenle",
        editButton: "Düzenle",
        totalItemsLabel: "{{count}} içerik",
        exportErrorImage: "Resim oluşturulurken bir hata oluştu.",
        exportDownloadLabel: "📸 İndir",
        shareLabel: "📱 Paylaş",
        saveAndLinkLabel: "💾 Kaydet ve Link Al",
        linkCreatedLabel: "Bağlantı Oluşturuldu!",
        copyLinkButton: "🔗 Linki Kopyala",
        copied: "✓ Kopyalandı!",
        viewButton: "Görüntüle →",
        savingLinkError: "Link oluşturulurken bir hata oluştu.",
        untitledList: "İsimsiz Liste",
        anonymous: "Anonim",
        shareTitleSuffix: " - TierFilm",
        shareText: "Film ve dizi tier listeme göz at! 🎬",
      },
      tiers: {
        modalTitle: "Tier Düzenle",
        cancel: "İptal",
        save: "Kaydet",
        unsortedTitle: "SIRALANMAMIŞLAR",
        searchHint: "Aramayla film veya dizi ekle",
      },
      comparison: {
        sectionLabel: "Karşılaştırma",
        pageTitle: "Zevk Uyumu",
        description:
          "İki tier listesini karşılaştır ve ortak zevk oranını keşfet.",
        firstListLabel: "1. Liste linki yapıştır",
        secondListLabel: "2. Liste linki yapıştır",
        inputPlaceholder: "Liste linkini yapıştır...",
        errorBothRequired: "Lütfen iki liste verisi gir.",
        errorBothInvalid:
          "Her iki liste de çözümlenemedi. Geçerli liste linklerini kontrol et.",
        errorFirstInvalid: "Birinci liste çözümlenemedi.",
        errorSecondInvalid: "İkinci liste çözümlenemedi.",
        comparing: "Karşılaştırılıyor...",
        compareButton: "🤝 Karşılaştır",
        helperText:
          "Karşılaştırmak istediğin iki listenin linklerini yapıştır.",
        noCommonTitle: "Hiç ortak yapım yok",
        noCommonDescription:
          "Bu iki listede ortak film veya dizi bulunmuyor. Daha fazla içerik ekleyin.",
        agreedTitle: "En çok anlaştığınız yapımlar",
        list1LikedTitle:
          "{{author1}}'in çok sevip {{author2}}'in düşük verdiği",
        list2LikedTitle:
          "{{author2}}'in çok sevip {{author1}}'in düşük verdiği",
        disagreedTitle: "En çok ayrıştığınız yapımlar",
        commonCountLabel: "Ortak yapım",
        listCountLabel: "{{author}}'in listesi",
        ctaCreateYourOwn: "Kendi listeni oluştur →",
        comparePromptTitle: "İki liste karşılaştır",
        comparePromptDescription:
          "Liste linklerini veya ID'lerini girerek aralarındaki zevk uyumunu görün.",
      },
      view: {
        loadingSkeletonLabel: "Liste yükleniyor...",
        notFoundTitle: "Liste bulunamadı",
        notFoundDescription: "Bu link geçersiz veya liste silinmiş olabilir.",
        notFoundCta: "Yeni Liste Oluştur",
        sectionLabel: "Tier Listesi",
        untitledList: "İsimsiz Liste",
        anonymous: "Anonim",
        downloadLabel: "📸 İndir",
        processingLabel: "⏳ İşleniyor...",
        shareLabel: "📱 Paylaş",
        linkLabel: "🔗 Link",
        copied: "✓ Kopyalandı",
        compareLabel: "🤝 Karşılaştır",
        totalItems: "Toplam İçerik",
        sTierLabel: "S tier'da ",
        noContentTitle: "Bu listede içerik yok",
        noContentDescription: "Liste oluşturulmuş ama henüz içerik eklenmemiş.",
        bottomCtaText: "Kendi tier listeni oluşturmak ister misin?",
        bottomCtaButton: "🎬 Liste Oluştur",
        exportErrorImage: "Resim oluşturulurken bir hata oluştu.",
      },
      shared: {
        listNotFound: "Liste bulunamadı",
        genericImageError: "Resim oluşturulurken bir hata oluştu.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
