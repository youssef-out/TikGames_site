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
      contact_btn: "مراسلتنا فوراً عبر واتساب"
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
      contact_btn: "Chat with Us on WhatsApp"
    }
  };

  // --------------------------------------------------------------------------
  // 2. AUDIBLE & COMFORTABLE AMBIENT BACKGROUND MUSIC
  // --------------------------------------------------------------------------
  const ambientAudio = new Audio('assets/sounds/ambient.wav');
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
    '.game-glass-card, .glass-bento-card, .pricing-glass-card, .btn-apple-primary, .btn-whatsapp-pill, .icon-glass-btn, .nav-link'
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

    updateSoundUI();
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
});
