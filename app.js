/**
 * TIK GAMES — APPLE FROSTED GLASS & AMBIENT AUDIO ENGINE
 * Features:
 * - Real ambient background audio loop (assets/sounds/ambient.wav) at comfortable audible volume
 * - Interactive UI Hover Sound Effects (Apple tactile ticks on cards and buttons)
 * - Clean SVG globe language toggle (AR/EN) without emojis, resets position instantly on click
 * - Clean core features matching the desktop app DNA (strictly Royal Blue #3b82f6 & White)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. STATE & LOCALIZATION DICTIONARY
  // --------------------------------------------------------------------------
  let currentLang = localStorage.getItem('tik_games_lang') || 'ar';
  let isAmbientPlaying = false;

  const translations = {
    ar: {
      nav_features: "المميزات",
      nav_games: "الألعاب",
      nav_pricing: "الاشتراكات",
      nav_influencers: "للمؤثرين (مجاناً)",
      nav_contact: "تواصل عبر واتساب",
      sound_btn_lbl: "صوت هادئ",
      hero_badge: "تطبيق سطح المكتب الأول لألعاب البث المباشر على تيك توك",
      hero_desc: "حوّل بث التيك توك إلى ساحة ألعاب تفاعلية ثلاثية وثنائية الأبعاد مباشرة، تجلب آلاف الداعمين واللاعبين في كل دقيقة مع تحكم سلس وتفاعل لحظي مع الهدايا.",
      hero_free: "الاشتراك مجاني بالكامل للمؤثرين وصناع المحتوى",
      hero_btn_beta: "طلب نسخة Beta عبر واتساب",
      hero_btn_download: "تحميل التطبيق",
      features_tag: "مميزات التطبيق",
      features_title: "مصمم بأعلى معايير الأداء لصناع المحتوى",
      features_desc: "يقدم Tik Games تجربة ثورية تجمع بين السرعة الفائقة، التصميم الزجاجي الانسيابي، والتفاعل اللحظي المباشر مع هدايا المتابعين.",
      feat_1_title: "ربط مباشر مع TikTok Live",
      feat_1_desc: "اتصال آمن وفوري بمجرد إدخال اسم مستخدم حسابك (@username). بدون الحاجة لأي كلمات مرور أو تعريض حسابك للخطر.",
      feat_2_title: "ألعاب تفاعلية 3D و 2D حصرية",
      feat_2_desc: "ألعاب تفاعلية مبنية بمحركات خفيفة وسريعة، تتفاعل في الوقت الفعلي مع هدايا التيك توك وتخلق حماساً وتنافساً كبيراً في البث.",
      feat_3_title: "المعلق الصوتي الذكي (AI TTS)",
      feat_3_desc: "روبوت صوتي ذكي ينطق أسماء الداعمين والتعليقات باللغة العربية الفصحى واللهجات فور وصول الهدية مع نظام فلترة تلقائي.",
      feat_4_title: "ترخيص آمن ومشفر",
      feat_4_desc: "تفعيل رقمي فوري مشفر ومحمي برقم عتاد الجهاز، يضمن استقرار البرنامج وتلقي التحديثات والتحسينات الدورية باستمرار.",
      games_tag: "الألعاب التفاعلية",
      games_title: "ألعاب البث المباشر التفاعلية",
      games_desc: "لعبة سباق الهجن ثلاثية الأبعاد مكتملة ومتاحة حالياً، وبقية الألعاب يجري تجهيزها وستتوفر قريباً!",
      badge_ready: "مكتملة ومتاحة الآن",
      badge_soon: "قريباً • Soon",
      game_camel_desc: "سباق هجن خليجي أصيل ثلاثي الأبعاد بمحرك Three.js، مع سيارات الدفع الرباعي 4x4 للسحب والرمال المتحركة والعواصف الرملية عند إرسال الهدايا.",
      game_clasico_desc: "نزال وتحدي سيارة برشلونة ضد ريال مدريد، في مواجهة لمعرفة من صاحب الداعمين الأقوى في البث!",
      game_stackball_desc: "تحطيم الحلقات الحلزونية بالفيزياء ثلاثية الأبعاد، هدايا الداعمين تفعّل دروع الحماية وتضاعف سرعة هبوط الكرة الصاروخي.",
      game_stackbox_desc: "برج صناديق ديناميكي متأرجح يطبع اسم كل داعم وصورته على الصندوق الخاص به مع خط فوز ذكي متفاعل.",
      game_hillclimb_desc: "فيزياء تعليق واقعية ونظام وقود وصواريخ نيترو، المتابعون يرمون صخوراً معرقلة أو يزودون السيارة بالبنزين.",
      pricing_tag: "باقات الاشتراك",
      pricing_title: "اختر خطة الاشتراك المناسبة لبثك",
      pricing_desc: "اشتراكات مرنة تناسب الستريمرز، مع اشتراك مجاني كامل مخصص للمؤثرين وصناع المحتوى.",
      tier_monthly_title: "الاشتراك الشهري",
      tier_monthly_desc: "مثالي للبدء وتجربة قوة ألعاب البث التفاعلي على حسابك.",
      plan_m_1: "فتح لعبة سباق الهجن 3D المكتملة",
      plan_m_2: "ربط فوري ومباشر بحساب TikTok Live",
      plan_m_3: "تفاعل لحظي مع الهدايا بدون تأخير",
      plan_m_4: "تحديثات دورية مجانية للألعاب",
      plan_m_5: "دعم فني وتفعيل سريع عبر واتساب",
      tier_inf_title: "اشتراك مجاني للمؤثرين",
      tier_inf_desc: "متاح مجاناً 100% لأصحاب قنوات التيك توك والستريمرز النشطين.",
      badge_creators: "عرض خاص للمؤثرين",
      plan_inf_1: "ترخيص مجاني كامل مدى الحياة للمؤثرين",
      plan_inf_2: "فتح كافة الألعاب الحالية والمستقبلية فور صدورها",
      plan_inf_3: "المعلق الصوتي الذكي AI TTS مفتوح بالكامل",
      plan_inf_4: "ربط مباشر وتفاعل فوري مع هدايا البث",
      plan_inf_5: "دعم مباشر وأولوية في تخصيص الألعاب للبث",
      tier_yearly_title: "الاشتراك السنوي",
      tier_yearly_desc: "الخيار الاحترافي للستريمرز الدائمين الذين يبثون يومياً.",
      plan_y_1: "ترخيص كامل لمدة سنة كاملة مع توفير 55%",
      plan_y_2: "كافة الألعاب التفاعلية + التحديثات الدورية",
      plan_y_3: "المعلق الصوتي الذكي AI TTS بدون حدود",
      plan_y_4: "تفعيل ترخيص رقمي آمن ومشفر",
      plan_y_5: "أولوية قصوى في الدعم المباشر على مدار الساعة",
      contact_title: "طلب نسخة Beta أو الاستفسار عن الاشتراكات",
      contact_sub: "لطلب تجربة النسخة التجريبية (Beta) أو الحصول على كود التفعيل والاشتراك المجاني للمؤثرين، تواصل معنا مباشرة عبر محادثة واتساب.",
      contact_btn: "مراسلتنا فوراً عبر واتساب",
      nav_demo: "تجربة اللعبة",
      demo_tag: "تجربة حية تفاعلية",
      demo_title: "جرّب تفاعل ألعاب البث المباشر بنفسك الآن",
      demo_desc: "اضغط على الهدايا لدعم الفريق الأزرق أو الأحمر، وشاهد كيف يتفاعل شريط البث اللحظي ونقاط الداعمين بسرعة فائقة تماماً كما في بث التيك توك الحقيقي.",
      battle_reset: "جولة جديدة",
      blue_team_lbl: "الفريق الأزرق",
      red_team_lbl: "الفريق الأحمر",
      tap_gift_hint: "اضغط على هدية",
      gift_rose: "وردة",
      gift_finger_heart: "قلب الإصبع",
      gift_heart: "قلب حب",
      gift_hand_heart: "قلب باليدين",
      gift_tiktok: "شعار تيك توك",
      gift_icecream: "آيس كريم",
      gift_pass: "تذكرة رحلة",
      gift_money_gun: "مسدس الأموال",
      battle_play_again: "جولة جديدة • Play Again",
      nav_beta_short: "طلب نسخة Beta",
      hero_soon_badge: "قريباً",
      hero_soon_title: "رابط التحميل سيكون متاحاً قريباً",
      btn_order_whatsapp: "طلب الاشتراك عبر واتساب",
      btn_free_whatsapp: "احصل على نسختك المجانية عبر واتساب",
      period_month: "/ شهر",
      period_year: "/ سنة",
      price_free_word: "مجاناً",
      footer_rights: "© 2026 Tik Games. جميع الحقوق محفوظة.",
      footer_whatsapp: "واتساب: +212617892238"
    },
    en: {
      nav_features: "Features",
      nav_games: "Games",
      nav_pricing: "Pricing",
      nav_influencers: "For Influencers (Free)",
      nav_contact: "Contact WhatsApp",
      sound_btn_lbl: "Ambient Audio",
      hero_badge: "#1 Desktop App for TikTok Live Interactive Gaming",
      hero_desc: "Turn your TikTok Live into a real-time 3D & 2D interactive gaming arena, attracting thousands of backers every minute with seamless controls and instant reactions.",
      hero_btn_beta: "Request Beta via WhatsApp",
      hero_free: "100% free subscription for influencers & creators",
      hero_btn_download: "Download App",
      features_tag: "App Capabilities",
      features_title: "Engineered for Elite Streamers & Creators",
      features_desc: "Tik Games delivers ultra-low latency, Apple-grade frosted glass aesthetic, and instant TikTok Live interactions.",
      feat_1_title: "Direct TikTok Live Connection",
      feat_1_desc: "Safe & instant sync simply by typing your TikTok username (@username). No passwords or credentials required.",
      feat_2_title: "Exclusive 3D & 2D Games",
      feat_2_desc: "Lightweight, responsive game engines that react in real-time to viewer gifts and create high-energy live stream competition.",
      feat_3_title: "AI Voice Announcer (AI TTS)",
      feat_3_desc: "Smart AI engine speaking donor names and live comments out loud with automatic profanity filters and custom voices.",
      feat_4_title: "Secure Encrypted Licensing",
      feat_4_desc: "Instant encrypted digital license tied directly to your hardware, ensuring peak reliability and ongoing updates.",
      games_tag: "Interactive Arsenal",
      games_title: "Live Interactive Games",
      games_desc: "Camel Race 3D is complete and available now; remaining games are in active preparation and releasing soon!",
      badge_ready: "Ready & Available Now",
      badge_soon: "Coming Soon",
      game_camel_desc: "Authentic 3D Gulf camel racing powered by Three.js with 4x4 tow trucks, quicksand, and gift-triggered sandstorms.",
      game_clasico_desc: "FC Barcelona vs Real Madrid battle car duel — an epic showdown to see who commands the strongest backers on stream!",
      game_stackball_desc: "3D physics spiral tower smashing. Gifts trigger invulnerability shields and terminal velocity drops.",
      game_stackbox_desc: "Swinging 3D box tower that prints donor names and avatars onto their boxes with an interactive win-line.",
      game_hillclimb_desc: "Realistic 2D suspension and fuel physics. Viewers drop rolling boulders or deliver rocket nitro boosts.",
      pricing_tag: "Pricing Plans",
      pricing_title: "Choose the Perfect Plan for Your Stream",
      pricing_desc: "Flexible subscription tiers, plus a completely FREE license for active TikTok influencers.",
      tier_monthly_title: "Monthly Pass",
      tier_monthly_desc: "Perfect to start experiencing interactive streaming on your channel.",
      plan_m_1: "Access to complete 3D Camel Race game",
      plan_m_2: "Instant TikTok Live channel connection",
      plan_m_3: "Zero-latency real-time gift reactions",
      plan_m_4: "Free periodic updates & patches",
      plan_m_5: "Fast setup & WhatsApp technical support",
      tier_inf_title: "Free Creator Pass",
      tier_inf_desc: "100% Free for active TikTok creators and live streamers.",
      badge_creators: "Creator Special",
      plan_inf_1: "Full Lifetime Free License for Creators",
      plan_inf_2: "Instant access to all current and upcoming games",
      plan_inf_3: "Full unlimited AI TTS voice announcer",
      plan_inf_4: "Direct live gift reaction engine",
      plan_inf_5: "Priority support and game stream customization",
      tier_yearly_title: "Annual Pro Pass",
      tier_yearly_desc: "The premier choice for creators broadcasting on a daily basis.",
      plan_y_1: "Full 1-year license with 55% savings",
      plan_y_2: "All interactive games + regular updates",
      plan_y_3: "Unlimited AI TTS voice announcer",
      plan_y_4: "Secure hardware-encrypted license activation",
      plan_y_5: "24/7 VIP priority assistance",
      contact_title: "Request Beta Access or Inquire About Plans",
      contact_sub: "To test the Beta build or activate your Free Influencer Pass, reach out directly to us on WhatsApp.",
      contact_btn: "Chat with Us on WhatsApp",
      nav_demo: "Live Demo",
      demo_tag: "Interactive Live Demo",
      demo_title: "Experience TikTok Live Gaming Interaction Now",
      demo_desc: "Tap gifts to support the Blue or Red team and watch real-time tug-of-war tugging, donation feedback, and victory animations just like on TikTok Live.",
      battle_reset: "New Round",
      blue_team_lbl: "BLUE TEAM",
      red_team_lbl: "RED TEAM",
      tap_gift_hint: "Tap a gift",
      gift_rose: "Rose",
      gift_finger_heart: "Finger Heart",
      gift_heart: "Heart",
      gift_hand_heart: "Hand Heart",
      gift_tiktok: "TikTok",
      gift_icecream: "Ice Cream",
      gift_pass: "Journey Pass",
      gift_money_gun: "Money Gun",
      battle_play_again: "New Round • Play Again",
      nav_beta_short: "Request Beta",
      hero_soon_badge: "Soon",
      hero_soon_title: "Download link will be available soon",
      btn_order_whatsapp: "Order via WhatsApp",
      btn_free_whatsapp: "Get Your Free Pass via WhatsApp",
      period_month: "/ month",
      period_year: "/ year",
      price_free_word: "Free",
      footer_rights: "© 2026 Tik Games. All rights reserved.",
      footer_whatsapp: "WhatsApp: +212617892238"
    }
  };

  const WHATSAPP_NUMBER = '212617892238';
  const waMessages = {
    ar: {
      wa_beta: "مرحبا، اريد طلب نسخة Beta من تطبيق Tik Games",
      wa_monthly: "مرحبا، اريد طلب الاشتراك الشهري لتطبيق Tik Games",
      wa_influencer: "مرحبا، انا صانع محتوى واريد الحصول على الاشتراك المجاني الخاص بالمؤثرين لتطبيق Tik Games",
      wa_yearly: "مرحبا، اريد طلب الاشتراك السنوي لتطبيق Tik Games"
    },
    en: {
      wa_beta: "Hello, I would like to request the Beta version of Tik Games.",
      wa_monthly: "Hello, I would like to order the Monthly Pass for Tik Games.",
      wa_influencer: "Hello, I am a content creator and would like to get the Free Creator Pass for Tik Games.",
      wa_yearly: "Hello, I would like to order the Annual Pro Pass for Tik Games."
    }
  };

  // Resolve base URL relative to app.js so root (/) and subpages (/download/) both work cleanly
  const appScriptEl = document.querySelector('script[src*="app.js"]');
  const SITE_BASE = appScriptEl
    ? appScriptEl.src.replace(/app\.js(\?.*)?$/i, '')
    : './';

  // --------------------------------------------------------------------------
  // 2. AUDIBLE & COMFORTABLE AMBIENT BACKGROUND MUSIC
  // --------------------------------------------------------------------------
  const ambientAudio = new Audio(`${SITE_BASE}assets/sounds/ambient.wav`);
  ambientAudio.loop = true;
  ambientAudio.preload = 'auto';
  ambientAudio.volume = 0.40; // Audible, clear, comfortable volume

  const soundBtn = document.getElementById('soundToggleBtn');
  const soundBtnText = document.getElementById('soundBtnText');

  function updateSoundUI() {
    if (!soundBtn) return;
    if (isAmbientPlaying) {
      soundBtn.classList.remove('muted');
      soundBtn.classList.add('playing');
      soundBtn.title = currentLang === 'ar' ? "إيقاف صوت الخلفية" : "Mute Background Audio";
    } else {
      soundBtn.classList.remove('playing');
      soundBtn.classList.add('muted');
      soundBtn.title = currentLang === 'ar' ? "تشغيل صوت الخلفية الهادئ" : "Play Background Audio";
    }
  }

  function toggleAmbientMusic() {
    if (isAmbientPlaying) {
      ambientAudio.pause();
      isAmbientPlaying = false;
    } else {
      ambientAudio.play().then(() => {
        isAmbientPlaying = true;
      }).catch(err => {
        console.log("Audio autoplay prevented, user click will unlock it.");
      });
      isAmbientPlaying = true;
    }
    updateSoundUI();
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAmbientMusic();
      playHoverTick(600);
    });
  }

  // Attempt auto-start on first user interaction anywhere on the page
  function unlockAudioOnFirstGesture() {
    if (!isAmbientPlaying) {
      ambientAudio.play().then(() => {
        isAmbientPlaying = true;
        updateSoundUI();
      }).catch(() => {});
    }
    document.removeEventListener('click', unlockAudioOnFirstGesture);
  }
  document.addEventListener('click', unlockAudioOnFirstGesture, { once: true });

  // --------------------------------------------------------------------------
  // 3. TACTILE UI HOVER SOUND EFFECTS (MOUSE ENTER MICRO-CLICKS)
  // --------------------------------------------------------------------------
  let hoverCtx = null;
  let lastHoverTime = 0;

  function playHoverTick(freq = 1250) {
    const now = performance.now();
    if (now - lastHoverTime < 60) return; // Debounce 60ms
    lastHoverTime = now;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!hoverCtx) hoverCtx = new AudioCtx();
      if (hoverCtx.state === 'suspended') hoverCtx.resume();

      const osc = hoverCtx.createOscillator();
      const gain = hoverCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, hoverCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, hoverCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.08, hoverCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, hoverCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(hoverCtx.destination);

      osc.start();
      osc.stop(hoverCtx.currentTime + 0.036);
    } catch (e) {}
  }

  // Attach hover sounds to cards, pills, and buttons
  const hoverTargets = document.querySelectorAll(
    '.game-glass-card, .glass-bento-card, .pricing-glass-card, .btn-apple-primary, .btn-whatsapp-pill, .btn-download-pill, .icon-glass-btn, .nav-link'
  );

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      playHoverTick(1100);
    });
  });

  // --------------------------------------------------------------------------
  // 4. LANGUAGE SWITCHER (NO STICKY ROTATION, RESETS TO DEFAULT ON CLICK)
  // --------------------------------------------------------------------------
  const langBtn = document.getElementById('langToggleBtn');
  const langLabel = document.getElementById('langLabel');

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tik_games_lang', lang);
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (lang === 'en') {
      document.body.classList.add('lang-en');
      if (langLabel) langLabel.textContent = "العربية";
    } else {
      document.body.classList.remove('lang-en');
      if (langLabel) langLabel.textContent = "English";
    }

    const dict = translations[lang] || translations.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.title = dict[key];
      }
    });

    const waDict = waMessages[lang] || waMessages.ar;
    document.querySelectorAll('[data-wa-key]').forEach(el => {
      const key = el.getAttribute('data-wa-key');
      if (waDict[key]) {
        el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waDict[key])}`;
      }
    });

    updateSoundUI();
    window.dispatchEvent(new CustomEvent('tikgames:langchange', { detail: { lang } }));
  }

  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(nextLang);

      // Instantly blur so the button never stays stuck in :focus / hold state
      langBtn.blur();

      // Click audio feedback
      playHoverTick(1400);
    });
  }

  applyLanguage(currentLang);
  updateSoundUI();

  // --------------------------------------------------------------------------
  // 5. NAVBAR SCROLL EFFECT
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // --------------------------------------------------------------------------
  // 6. INTERACTIVE DOT MATRIX GRID (MOUSE-REACTIVE ILLUMINATION FIELD)
  // --------------------------------------------------------------------------
  function initInteractiveDotGrid() {
    const canvas = document.getElementById('dotGridCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Grid configuration (Density matches reference screenshot ~32px)
    const spacing = 32;
    const baseRadius = 1.1;
    const maxRadius = 2.8;
    const interactionRadius = 220;
    const maxDisplacement = 3.5;

    const mouse = {
      x: window.innerWidth * 0.5,
      y: 260,
      targetX: window.innerWidth * 0.5,
      targetY: 260,
      active: true,
      alpha: 0.75
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    }, { passive: true });

    // Touch support for tablets / mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    }, { passive: true });

    const radSq = interactionRadius * interactionRadius;

    function render() {
      // Smooth lerp for fluid spotlight trailing
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.16;
        mouse.y += (mouse.targetY - mouse.y) * 0.16;
        mouse.alpha += (1 - mouse.alpha) * 0.08;
      } else {
        mouse.alpha += (0 - mouse.alpha) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;

      for (let r = 0; r < rows; r++) {
        const origY = r * spacing + offsetY;

        for (let c = 0; c < cols; c++) {
          const origX = c * spacing + offsetX;

          let drawX = origX;
          let drawY = origY;
          let dotRadius = baseRadius;
          let fillStyle = 'rgba(255, 255, 255, 0.11)'; // Crisp base dot

          if (mouse.alpha > 0.005) {
            const dx = origX - mouse.x;
            const dy = origY - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radSq) {
              const dist = Math.sqrt(distSq);
              const norm = 1 - dist / interactionRadius; // 1 at center, 0 at perimeter
              const strength = norm * norm * mouse.alpha; // Quadratic falloff for smooth luminous curve

              // Subtle physical deflection
              if (dist > 0.1) {
                const push = strength * maxDisplacement;
                drawX += (dx / dist) * push;
                drawY += (dy / dist) * push;
              }

              // Enlarge dot under cursor spotlight
              dotRadius = baseRadius + (maxRadius - baseRadius) * strength;

              // Color gradient: Base dim -> Royal Blue (#3b82f6 / #5496ff) -> Specular Pure White
              if (strength > 0.55) {
                // Core specular highlight
                const whiteRatio = (strength - 0.55) / 0.45;
                const rVal = Math.round(59 + (255 - 59) * whiteRatio);
                const gVal = Math.round(130 + (255 - 130) * whiteRatio);
                const aVal = 0.65 + 0.35 * strength;
                fillStyle = `rgba(${rVal}, ${gVal}, 255, ${aVal})`;
              } else {
                // Outer luminous blue aura
                const blueRatio = strength / 0.55;
                const rVal = Math.round(255 - (255 - 59) * blueRatio);
                const gVal = Math.round(255 - (255 - 130) * blueRatio);
                const aVal = 0.11 + (0.80 - 0.11) * blueRatio;
                fillStyle = `rgba(${rVal}, ${gVal}, 255, ${aVal})`;
              }
            }
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = fillStyle;
          ctx.fill();
        }
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  initInteractiveDotGrid();

  // --------------------------------------------------------------------------
  // 9. INTERACTIVE TIKTOK LIVE BATTLE MINI-GAME (TUG-OF-WAR ARENA)
  // --------------------------------------------------------------------------
  function initLiveBattleGame() {
    const arenaCard = document.querySelector('.battle-top-card');
    if (!arenaCard) return;

    // Initial State: 0 - 0 Scores, 50% vs 50% Fair Start
    let bluePct = 50;
    let blueWins = 0;
    let redWins = 0;
    let isGameOver = false;
    let confettiId = null;

    const blueFill = document.getElementById('battleBlueFill');
    const redFill = document.getElementById('battleRedFill');
    const tokenSlider = document.getElementById('battleTokenSlider');
    const bluePctText = document.getElementById('bluePctText');
    const redPctText = document.getElementById('redPctText');
    const blueScoreWins = document.getElementById('blueScoreWins');
    const redScoreWins = document.getElementById('redScoreWins');
    const blueLiveFeed = document.getElementById('blueLiveFeed');
    const redLiveFeed = document.getElementById('redLiveFeed');
    const victoryOverlay = document.getElementById('battleVictoryOverlay');
    const victoryHeadline = document.getElementById('victoryHeadline');
    const victoryRestartBtn = document.getElementById('victoryRestartBtn');
    const battleResetBtn = document.getElementById('battleResetBtn');
    const viewerCountEl = document.getElementById('battleViewerCount');
    const giftCards = document.querySelectorAll('.battle-gift-card');
    const confettiCanvas = document.getElementById('victoryConfettiCanvas');
    const heartsCanvas = document.getElementById('battleHeartsCanvas');

    const coinAudio = new Audio('assets/sounds/coin.wav');

    // ------------------------------------------------------------------------
    // AMBIENT & BURST FLOATING HEARTS (BLUE LEFT, RED RIGHT)
    // ------------------------------------------------------------------------
    let heartsCtx = null;
    let heartParticles = [];

    function resizeHeartsCanvas() {
      if (!heartsCanvas || !arenaCard) return;
      const rect = arenaCard.getBoundingClientRect();
      heartsCanvas.width = rect.width;
      heartsCanvas.height = rect.height;
    }
    resizeHeartsCanvas();
    window.addEventListener('resize', resizeHeartsCanvas);

    // Vector icon heart (Path2D from a standard SVG heart icon) with glow, rim stroke and gloss
    const HEART_ICON_PATH = typeof Path2D !== 'undefined'
      ? new Path2D('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')
      : null;

    function drawHeartShape(ctx, x, y, size, color, alpha, rotation = 0) {
      if (!HEART_ICON_PATH) return;
      const s = (size * 2) / 24;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(s, s);
      ctx.translate(-12, -12);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

      // Soft colored glow + filled body (no stroke)
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = color;
      ctx.fill(HEART_ICON_PATH);
      ctx.restore();
    }

    function createAmbientHeart(team) {
      if (!heartsCanvas) return null;
      const width = heartsCanvas.width || 800;
      const height = heartsCanvas.height || 450;
      const isBlue = team === 'blue';

      // Left half for blue (4% to 46%), Right half for red (54% to 96%)
      const minX = isBlue ? width * 0.04 : width * 0.54;
      const maxX = isBlue ? width * 0.46 : width * 0.96;
      const x = minX + Math.random() * (maxX - minX);
      const y = height + 10 + Math.random() * 20;

      const blueColors = ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8'];
      const redColors = ['#ef4444', '#f87171', '#fb7185', '#f43f5e'];
      const color = isBlue ? blueColors[Math.floor(Math.random() * blueColors.length)] : redColors[Math.floor(Math.random() * redColors.length)];

      return {
        x,
        y,
        baseX: x,
        size: Math.random() * 7 + 7,
        vy: -(Math.random() * 0.7 + 0.55),
        swayOffset: Math.random() * Math.PI * 2,
        swayWidth: Math.random() * 12 + 8,
        color,
        alpha: 0,
        targetAlpha: Math.random() * 0.5 + 0.35,
        team,
        isBurst: false
      };
    }

    function spawnHeartBurst(team, clientX, clientY) {
      if (!heartsCanvas) return;
      const rect = heartsCanvas.getBoundingClientRect();
      const originX = clientX ? (clientX - rect.left) : (team === 'blue' ? rect.width * 0.25 : rect.width * 0.75);
      const originY = clientY ? (clientY - rect.top) : (rect.height * 0.7);

      const count = 9;
      const isBlue = team === 'blue';
      const blueColors = ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8', '#ffffff'];
      const redColors = ['#ef4444', '#f87171', '#fb7185', '#f43f5e', '#ffffff'];
      const colors = isBlue ? blueColors : redColors;

      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        heartParticles.push({
          x: originX + (Math.random() - 0.5) * 36,
          y: originY + (Math.random() - 0.5) * 20,
          baseX: originX,
          size: Math.random() * 9 + 8,
          vx: (Math.random() - 0.5) * 2.2,
          vy: -(Math.random() * 2.5 + 2.0),
          swayOffset: Math.random() * Math.PI * 2,
          swayWidth: Math.random() * 18 + 8,
          color,
          alpha: 1,
          decay: Math.random() * 0.012 + 0.014,
          team,
          isBurst: true
        });
      }
    }

    // Initialize 24 ambient floating hearts (12 blue on left, 12 red on right)
    for (let i = 0; i < 12; i++) {
      const h = createAmbientHeart('blue');
      if (h) {
        h.y = Math.random() * (heartsCanvas.height || 400);
        h.alpha = Math.random() * 0.6 + 0.2;
        heartParticles.push(h);
      }
    }
    for (let i = 0; i < 12; i++) {
      const h = createAmbientHeart('red');
      if (h) {
        h.y = Math.random() * (heartsCanvas.height || 400);
        h.alpha = Math.random() * 0.6 + 0.2;
        heartParticles.push(h);
      }
    }

    function renderHearts() {
      if (!heartsCanvas) return;
      if (!heartsCtx) heartsCtx = heartsCanvas.getContext('2d');
      heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);

      const time = performance.now() * 0.001;

      for (let i = heartParticles.length - 1; i >= 0; i--) {
        const p = heartParticles[i];

        if (p.isBurst) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy *= 0.985;
          p.alpha -= p.decay;

          if (p.alpha <= 0.01 || p.y < -30) {
            heartParticles.splice(i, 1);
            continue;
          }
        } else {
          p.y += p.vy;
          p.x = p.baseX + Math.sin(time * 2 + p.swayOffset) * p.swayWidth;

          if (p.alpha < p.targetAlpha) {
            p.alpha += 0.015;
          }

          if (p.y < 60) {
            p.alpha -= 0.02;
          }

          if (p.y < -20 || p.alpha <= 0) {
            const newH = createAmbientHeart(p.team);
            if (newH) {
              heartParticles[i] = newH;
            }
          }
        }

        drawHeartShape(heartsCtx, p.x, p.y, p.size, p.color, p.alpha, Math.sin(time * 1.6 + p.swayOffset) * 0.28);
      }

      requestAnimationFrame(renderHearts);
    }
    requestAnimationFrame(renderHearts);

    // ------------------------------------------------------------------------
    // RICH DEDICATED WEB AUDIO FX SUITE
    // ------------------------------------------------------------------------
    let battleAudioCtx = null;
    function getAudioCtx() {
      if (!battleAudioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        battleAudioCtx = new AudioCtx();
      }
      if (battleAudioCtx.state === 'suspended') {
        battleAudioCtx.resume();
      }
      return battleAudioCtx;
    }

    // 1. Tactile Button Click
    function playButtonClick(freq = 1450) {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.035);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.036);
      } catch (e) {}
    }

    // 2. Rich Gift Send Audio (Varies by Gift Power)
    function playGiftSend(power, team) {
      try {
        // Real coin audio layer with pitch modulation
        const clone = coinAudio.cloneNode();
        clone.volume = 0.55;
        clone.playbackRate = Math.min(1.5, Math.max(0.75, 1.25 - (power / 35)));
        clone.play().catch(() => {});

        // Harmonic Web Audio layer
        const ctx = getAudioCtx();
        const now = ctx.currentTime;

        if (power <= 4) {
          // Small gift (Rose / TikTok): High sparkling dual-chime
          const notes = team === 'blue' ? [1046, 1318] : [987, 1244];
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);
            gain.gain.setValueAtTime(0.08, now + idx * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 0.23);
          });
        } else if (power <= 10) {
          // Medium gift (Finger Heart / Ice Cream / Heart / Journey Pass): Punchy resonant chord
          const baseFreq = team === 'blue' ? 523 : 493;
          [baseFreq, baseFreq * 1.5, baseFreq * 2].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.15, now + idx * 0.05 + 0.15);
            gain.gain.setValueAtTime(0.1, now + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.28);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.29);
          });
        } else {
          // Mega gift (Hand Heart / Money Gun): Sub-bass punch + 5-tone cash cascade
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.type = 'sine';
          subOsc.frequency.setValueAtTime(95, now);
          subOsc.frequency.exponentialRampToValueAtTime(42, now + 0.25);
          subGain.gain.setValueAtTime(0.16, now);
          subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
          subOsc.connect(subGain);
          subGain.connect(ctx.destination);
          subOsc.start(now);
          subOsc.stop(now + 0.27);

          const megaNotes = [523, 659, 783, 1046, 1318];
          megaNotes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.045);
            gain.gain.setValueAtTime(0.12, now + idx * 0.045);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.045);
            osc.stop(now + idx * 0.045 + 0.36);
          });
        }
      } catch (e) {}
    }

    // 3. Dynamic Tug Bar Progress Shift Sound (Whoosh with directional pitch)
    function playTugShift(team) {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        filter.type = 'bandpass';
        filter.Q.value = 2.5;

        if (team === 'blue') {
          osc.frequency.setValueAtTime(280, now);
          osc.frequency.exponentialRampToValueAtTime(620, now + 0.18);
          filter.frequency.setValueAtTime(400, now);
          filter.frequency.exponentialRampToValueAtTime(900, now + 0.18);
        } else {
          osc.frequency.setValueAtTime(620, now);
          osc.frequency.exponentialRampToValueAtTime(280, now + 0.18);
          filter.frequency.setValueAtTime(900, now);
          filter.frequency.exponentialRampToValueAtTime(400, now + 0.18);
        }

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.19);
      } catch (e) {}
    }

    // 4. Lead Change Alert (Pings when a team crosses 50%)
    let previousLeader = 'tie';
    function checkLeadChange(currentBluePct) {
      let currentLeader = 'tie';
      if (currentBluePct > 51) currentLeader = 'blue';
      else if (currentBluePct < 49) currentLeader = 'red';

      if (currentLeader !== 'tie' && currentLeader !== previousLeader) {
        previousLeader = currentLeader;
        try {
          const ctx = getAudioCtx();
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const freq = currentLeader === 'blue' ? 880 : 740;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.setValueAtTime(freq * 1.25, now + 0.08);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.23);
        } catch (e) {}
      }
    }

    // 5. Grand Victory Fanfare (Celebratory Multi-Stage Brass Chords & Fireworks)
    function playVictoryFanfare(winnerTeam) {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;

        const chords = winnerTeam === 'blue' ? [
          { time: 0.00, notes: [523.25, 659.25, 783.99], dur: 0.18 },
          { time: 0.16, notes: [659.25, 830.61, 987.77], dur: 0.18 },
          { time: 0.32, notes: [783.99, 987.77, 1174.66], dur: 0.22 },
          { time: 0.52, notes: [1046.50, 1318.51, 1567.98, 2093.00], dur: 0.85 }
        ] : [
          { time: 0.00, notes: [440.00, 554.37, 659.25], dur: 0.18 },
          { time: 0.16, notes: [554.37, 698.46, 830.61], dur: 0.18 },
          { time: 0.32, notes: [659.25, 880.00, 1108.73], dur: 0.22 },
          { time: 0.52, notes: [880.00, 1108.73, 1318.51, 1760.00], dur: 0.85 }
        ];

        chords.forEach(chord => {
          chord.notes.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + chord.time);
            gain.gain.setValueAtTime(0.09, now + chord.time);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + chord.time + chord.dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + chord.time);
            osc.stop(now + chord.time + chord.dur + 0.02);
          });
        });

        // 3 celebratory sparkle bursts (fireworks pops)
        [0.65, 0.85, 1.05].forEach((burstTime, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400 + idx * 300, now + burstTime);
          osc.frequency.exponentialRampToValueAtTime(400, now + burstTime + 0.12);
          gain.gain.setValueAtTime(0.08, now + burstTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + burstTime + 0.13);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + burstTime);
          osc.stop(now + burstTime + 0.14);
        });
      } catch (e) {}
    }

    // 6. Round Reset Sound (Sci-Fi Reverse Whoosh)
    function playResetSound() {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.28);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.29);
      } catch (e) {}
    }

    // ------------------------------------------------------------------------
    // UI UPDATES
    // ------------------------------------------------------------------------
    function updateBattleUI() {
      const clampedBlue = Math.max(0, Math.min(100, bluePct));
      const clampedRed = 100 - clampedBlue;

      if (blueFill) blueFill.style.width = clampedBlue + '%';
      if (redFill) redFill.style.width = clampedRed + '%';
      if (tokenSlider) tokenSlider.style.left = clampedBlue + '%';

      if (bluePctText) bluePctText.textContent = Math.round(clampedBlue) + '%';
      if (redPctText) redPctText.textContent = Math.round(clampedRed) + '%';

      if (blueScoreWins) blueScoreWins.textContent = blueWins;
      if (redScoreWins) redScoreWins.textContent = redWins;

      checkLeadChange(clampedBlue);
    }

    function pushFeedPill(sender, giftImg, actionText, team) {
      const targetFeed = team === 'blue' ? blueLiveFeed : redLiveFeed;
      if (!targetFeed) return;
      const pill = document.createElement('div');
      pill.className = `feed-pill ${team}-feed ${sender === 'You' ? 'user-pill' : ''}`;
      const initials = sender.substring(0, 2).toUpperCase();
      pill.innerHTML = `
        <span class="feed-avatar">${initials}</span>
        <span class="feed-text"><strong>${sender}</strong> sent <img src="${giftImg}" width="18" height="18" class="feed-gift-img" alt="gift"> <span class="feed-action">${actionText}</span></span>
      `;
      targetFeed.appendChild(pill);

      while (targetFeed.children.length > 2) {
        targetFeed.removeChild(targetFeed.firstElementChild);
      }
    }

    // Cinematic Gift Flight: lift-off pop -> slow curved arc with glowing trail -> impact on logo
    function flyGiftToCenterLogo(card, giftImgSrc, onArrive) {
      if (!tokenSlider) { if (onArrive) onArrive(); return; }
      const imgEl = card.querySelector('.gift-real-img');
      const startRect = imgEl ? imgEl.getBoundingClientRect() : card.getBoundingClientRect();
      const logoBadge = tokenSlider.querySelector('.battle-logo-token-wrap');
      const targetRect = (logoBadge || tokenSlider).getBoundingClientRect();

      const sx = startRect.left + startRect.width / 2;
      const sy = startRect.top + startRect.height / 2;
      const ex = targetRect.left + targetRect.width / 2;
      const ey = targetRect.top + targetRect.height / 2;

      // Control point of the quadratic arc: lifted high above the midpoint with a sideways bend
      const side = card.getAttribute('data-team') === 'blue' ? -1 : 1;
      const cx = (sx + ex) / 2 + side * 70;
      const cy = Math.min(sy, ey) - 120;

      const DURATION = 1500;
      const teamGlow = card.getAttribute('data-team') === 'blue' ? '96,165,250' : '248,113,113';

      const flyer = document.createElement('img');
      flyer.src = giftImgSrc;
      flyer.className = 'flying-gift-to-logo';
      flyer.style.left = '0px';
      flyer.style.top = '0px';
      flyer.style.setProperty('--glow', teamGlow);
      document.body.appendChild(flyer);

      const frames = [];
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * ex;
        const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ey;
        // Pop up big in the first third, then shrink gracefully into the logo
        let scale;
        if (t < 0.3) scale = 1 + (t / 0.3) * 0.9;
        else scale = 1.9 - ((t - 0.3) / 0.7) * 1.45;
        const rot = Math.sin(t * Math.PI) * 14 * side;
        const opacity = t > 0.92 ? (1 - t) / 0.08 : 1;
        frames.push({
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`,
          opacity,
          offset: t
        });
      }

      const anim = flyer.animate(frames, { duration: DURATION, easing: 'cubic-bezier(0.45, 0.05, 0.3, 1)', fill: 'forwards' });

      // Glowing ghost trail following the flyer
      let trailTimer = setInterval(() => {
        const rect = flyer.getBoundingClientRect();
        if (!rect.width) return;
        const ghost = document.createElement('img');
        ghost.src = giftImgSrc;
        ghost.className = 'flying-gift-ghost';
        ghost.style.left = (rect.left + rect.width / 2) + 'px';
        ghost.style.top = (rect.top + rect.height / 2) + 'px';
        ghost.style.width = (rect.width * 0.8) + 'px';
        ghost.style.height = (rect.height * 0.8) + 'px';
        ghost.style.setProperty('--glow', teamGlow);
        document.body.appendChild(ghost);
        ghost.animate(
          [{ opacity: 0.55, transform: 'translate(-50%, -50%) scale(1)' }, { opacity: 0, transform: 'translate(-50%, -50%) scale(0.35)' }],
          { duration: 520, easing: 'ease-out', fill: 'forwards' }
        ).onfinish = () => ghost.remove();
      }, 55);

      anim.onfinish = () => {
        clearInterval(trailTimer);
        flyer.remove();
        if (onArrive) onArrive();

        // Impact shockwave ring on the logo
        const ring = document.createElement('div');
        ring.className = 'logo-impact-ring';
        ring.style.left = ex + 'px';
        ring.style.top = ey + 'px';
        ring.style.setProperty('--glow', teamGlow);
        document.body.appendChild(ring);
        ring.animate(
          [{ opacity: 0.9, transform: 'translate(-50%, -50%) scale(0.6)' }, { opacity: 0, transform: 'translate(-50%, -50%) scale(2.6)' }],
          { duration: 650, easing: 'ease-out', fill: 'forwards' }
        ).onfinish = () => ring.remove();

        if (logoBadge) {
          logoBadge.classList.remove('token-impact');
          void logoBadge.offsetWidth;
          logoBadge.classList.add('token-impact');
        }
      };
    }

    // Confetti Engine
    let particles = [];
    function startConfetti(colorPalette) {
      if (!confettiCanvas) return;
      const ctx = confettiCanvas.getContext('2d');
      const rect = arenaCard.getBoundingClientRect();
      confettiCanvas.width = rect.width;
      confettiCanvas.height = rect.height;

      particles = [];
      const particleCount = 85;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * confettiCanvas.width,
          y: Math.random() * -confettiCanvas.height * 0.5,
          w: Math.random() * 10 + 6,
          h: Math.random() * 6 + 4,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 3 + 2.5,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8
        });
      }

      function renderConfetti() {
        if (!isGameOver) return;
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotSpeed;

          if (p.y > confettiCanvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * confettiCanvas.width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        });

        confettiId = requestAnimationFrame(renderConfetti);
      }

      cancelAnimationFrame(confettiId);
      renderConfetti();
    }

    function stopConfetti() {
      if (confettiId) cancelAnimationFrame(confettiId);
      if (confettiCanvas) {
        const ctx = confettiCanvas.getContext('2d');
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }

    function triggerVictory(winnerTeam) {
      if (isGameOver) return;
      isGameOver = true;

      // Play glorious victory fanfare
      playVictoryFanfare(winnerTeam);

      if (winnerTeam === 'blue') {
        blueWins++;
        if (blueScoreWins) blueScoreWins.textContent = blueWins;
        if (victoryHeadline) {
          victoryHeadline.textContent = 'BLUE TEAM WINS!';
          victoryHeadline.className = 'victory-banner-text blue-won';
        }
        startConfetti(['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff', '#38bdf8']);
      } else {
        redWins++;
        if (redScoreWins) redScoreWins.textContent = redWins;
        if (victoryHeadline) {
          victoryHeadline.textContent = 'RED TEAM WINS!';
          victoryHeadline.className = 'victory-banner-text red-won';
        }
        startConfetti(['#ef4444', '#f87171', '#fb7185', '#ffffff', '#f43f5e']);
      }

      if (victoryOverlay) {
        victoryOverlay.classList.add('active');
      }
    }

    function resetBattle(targetPct = 50) {
      playButtonClick(1200);
      playResetSound();

      isGameOver = false;
      bluePct = targetPct;
      previousLeader = 'tie';
      updateBattleUI();

      if (victoryOverlay) {
        victoryOverlay.classList.remove('active');
      }
      stopConfetti();
      giftCards.forEach(c => c.classList.remove('is-selected'));
    }

    // Gift card interactions
    giftCards.forEach(card => {
      // Tactile hover tick
      card.addEventListener('mouseenter', () => {
        playButtonClick(1600);
      });

      card.addEventListener('click', (e) => {
        if (isGameOver) return;

        // Highlight selected gift with white border matching screenshot cf3232a5.jpg
        giftCards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');

        const team = card.getAttribute('data-team');
        const power = parseFloat(card.getAttribute('data-power')) || 6;
        const giftImg = card.getAttribute('data-gift-img') || 'assets/gifts/rose.webp';
        const giftLabel = card.getAttribute('data-gift-label') || 'Power';

        // 1. Gift launch sound, then fly the gift image to the center logo
        playGiftSend(power, team);

        // 2. Burst floating team heart particles
        spawnHeartBurst(team, e.clientX, e.clientY);

        // 3. Progress advances ONLY when the gift actually reaches the logo
        flyGiftToCenterLogo(card, giftImg, () => {
          if (isGameOver) return;
          playTugShift(team);

          if (team === 'blue') {
            bluePct = Math.min(100, bluePct + power * 0.9);
          } else {
            bluePct = Math.max(0, bluePct - power * 0.9);
          }

          updateBattleUI();
          pushFeedPill('You', giftImg, giftLabel, team);

          if (bluePct >= 100) {
            triggerVictory('blue');
          } else if (bluePct <= 0) {
            triggerVictory('red');
          }
        });
      });
    });

    if (victoryRestartBtn) {
      victoryRestartBtn.addEventListener('mouseenter', () => playButtonClick(1500));
      victoryRestartBtn.addEventListener('click', () => resetBattle(50));
    }
    if (battleResetBtn) {
      battleResetBtn.addEventListener('mouseenter', () => playButtonClick(1500));
      battleResetBtn.addEventListener('click', () => resetBattle(50));
    }

    // Ambient viewers fluctuation
    setInterval(() => {
      if (viewerCountEl) {
        const count = 1300 + Math.floor(Math.random() * 25);
        viewerCountEl.textContent = count.toLocaleString('en-US');
      }
    }, 4000);

    // Periodic simulated viewer gift to keep stream active
    const simulatedBots = [
      { name: 'dilan.x', team: 'blue', img: 'assets/gifts/rose.webp', action: 'UP ×100', shift: 3 },
      { name: 'baran.storm', team: 'red', img: 'assets/gifts/ice_cream.webp', action: 'Fire', shift: -3 },
      { name: 'sultan.9', team: 'blue', img: 'assets/gifts/heart.webp', action: 'Cannon ×1,000', shift: 5 },
      { name: 'kawa.07', team: 'red', img: 'assets/gifts/tiktok.webp', action: 'DOWN ×100', shift: -3 }
    ];
    let botIndex = 0;

    setInterval(() => {
      if (isGameOver) return;
      const bot = simulatedBots[botIndex % simulatedBots.length];
      botIndex++;

      bluePct = Math.max(5, Math.min(95, bluePct + bot.shift));
      updateBattleUI();
      pushFeedPill(bot.name, bot.img, bot.action, bot.team);
      spawnHeartBurst(bot.team);
    }, 5500);

    // Initial render: 0 - 0 scores, 50% vs 50%
    updateBattleUI();
  }

  initLiveBattleGame();

  // --------------------------------------------------------------------------
  // 8. LIVE LATEST GITHUB RELEASE RESOLVER FOR HERO DOWNLOAD BUTTON
  // --------------------------------------------------------------------------
  async function initLatestReleaseButton() {
    const btn = document.getElementById('heroDownloadBtn');
    const verBadge = document.getElementById('heroDownloadVer');
    if (!btn) return;

    const REPO = 'youssef-out/TikGames_site';
    const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

    try {
      const res = await fetch(API_URL, {
        headers: { 'Accept': 'application/vnd.github+json' },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        const assets = Array.isArray(data.assets) ? data.assets : [];
        const exeAsset =
          assets.find(a => /\.exe$/i.test(a.name)) ||
          assets.find(a => /\.(msi|zip)$/i.test(a.name)) ||
          assets[0];

        if (data.tag_name && verBadge) {
          verBadge.textContent = data.tag_name;
        }
        if (exeAsset && exeAsset.browser_download_url) {
          btn.href = exeAsset.browser_download_url;
          const sizeMB = exeAsset.size ? ` (${(exeAsset.size / (1024 * 1024)).toFixed(1)} MB)` : '';
          btn.title = `${exeAsset.name}${sizeMB}`;
          return;
        }
      }
    } catch (_) {
      // Fallback to version.json below
    }

    try {
      const vRes = await fetch(`version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (vRes.ok) {
        const vData = await vRes.json();
        const ver = vData.latest_version || vData.version;
        if (ver && verBadge) {
          verBadge.textContent = ver.startsWith('v') ? ver : `v${ver}`;
        }
        if (vData.download_url) {
          btn.href = vData.download_url;
        }
      }
    } catch (_) {
      // Keep default href="download"
    }
  }

  initLatestReleaseButton();
});

