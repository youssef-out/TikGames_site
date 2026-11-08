/* Tik Games — Shared Broadcast FX, Gift Animations, Avatar Loader & Post-Round Podium */
(function () {
  const AVA_COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0891b2', '#4f46e5'];

  function hashStr(s) {
    let h = 0;
    const str = String(s || 'U');
    for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
    return Math.abs(h);
  }

  function avatarColor(uid) {
    return AVA_COLORS[hashStr(uid) % AVA_COLORS.length];
  }

  function initialLetter(name) {
    const clean = String(name || 'U').trim().replace(/^@/, '');
    return (clean[0] || 'U').toUpperCase();
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const STRINGS = {
    ar: {
      roundEnd: 'نهاية الجولة',
      topPlayers: 'قائمة المتصدرين وأبطال الجولة',
      nextSoon: 'تبدأ الجولة الجديدة قريباً...',
      startNow: 'بدء جولة جديدة الآن',
      activated: 'فعّل',
      points: 'نقطة',
      autoStartIn: (s) => `تبدأ الجولة التالية تلقائياً خلال ${s} ثانية...`,
    },
    en: {
      roundEnd: 'Round Finished',
      topPlayers: 'Top Players & Round Leaderboard',
      nextSoon: 'Next round starting soon...',
      startNow: 'Start New Round Now',
      activated: 'activated',
      points: 'pts',
      autoStartIn: (s) => `Next round starts automatically in ${s}s...`,
    },
  };

  const GameFX = {
    lang: 'ar',
    muted: false,
    players: new Map(),
    comboMap: new Map(),
    confettiAnim: null,
    countdownTimer: null,
    lastGifter: null,
    _onResetCb: null,

    t() {
      return STRINGS[this.lang] || STRINGS.ar;
    },

    setLang(lang) {
      this.lang = lang === 'en' ? 'en' : 'ar';
      const btn = document.getElementById('gfxBtnNextRound');
      if (btn) btn.textContent = this.t().startNow;
    },

    init() {
      if (document.getElementById('gfxGiftStack')) return;

      const stack = document.createElement('div');
      stack.id = 'gfxGiftStack';
      stack.className = 'gfx-gift-stack';
      document.body.appendChild(stack);

      const spot = document.createElement('div');
      spot.id = 'gfxSpotlight';
      spot.className = 'gfx-action-spotlight';
      document.body.appendChild(spot);

      const cnv = document.createElement('canvas');
      cnv.id = 'gfxConfettiCanvas';
      document.body.appendChild(cnv);

      const modal = document.createElement('div');
      modal.id = 'gfxLbBackdrop';
      modal.className = 'gfx-leaderboard-backdrop';
      modal.innerHTML = `
        <div class="gfx-lb-card">
          <img src="assets/crown.webp" class="gfx-lb-crown" alt="" onerror="this.style.display='none'">
          <div class="gfx-lb-title" id="gfxLbTitle">نهاية الجولة</div>
          <div class="gfx-lb-sub" id="gfxLbSub">قائمة المتصدرين وأبطال الجولة</div>
          <div class="gfx-podium" id="gfxPodium"></div>
          <div class="gfx-lb-list" id="gfxLbList"></div>
          <div class="gfx-lb-progress"><div class="gfx-lb-progress-bar" id="gfxLbBar"></div></div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <span id="gfxLbCountdown" style="font-size:12px;color:rgba(148,163,184,0.9);">تبدأ الجولة الجديدة قريباً...</span>
            <button class="btn btn-primary" id="gfxBtnNextRound" style="height:34px;padding:0 16px;border-radius:10px;border:none;background:linear-gradient(180deg,#5496ff,#2563eb);color:#fff;font-family:inherit;font-weight:700;cursor:pointer;">
              بدء جولة جديدة الآن
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('gfxBtnNextRound').addEventListener('click', () => {
        const cb = this._onResetCb;
        this.hideLeaderboard();
        if (cb) cb();
      });

      if (location.protocol.startsWith('http')) {
        setInterval(() => this.pushStateToServer(), 750);
      }
    },

    setMuted(flag) {
      this.muted = !!flag;
    },

    playSound(relPath, vol = 0.55) {
      if (this.muted) return;
      try {
        const a = new Audio(relPath);
        a.volume = vol;
        a.play().catch(() => {});
      } catch (e) {}
    },

    trackPlayer(user, nickname, avatar, addScore = 0, metricText = '') {
      const uid = String(user || 'viewer').replace(/^@/, '').toLowerCase() || 'viewer';
      const existing = this.players.get(uid) || {
        id: uid,
        username: uid,
        nickname: nickname || user || uid,
        avatar: avatar || '',
        score: 0,
        metric: '',
      };
      if (nickname) existing.nickname = nickname;
      if (avatar) existing.avatar = avatar;
      existing.score += Number(addScore || 0);
      if (metricText) existing.metric = metricText;
      this.players.set(uid, existing);
      return existing;
    },

    setPlayerScore(user, nickname, avatar, absScore = 0, metricText = '') {
      const uid = String(user || 'viewer').replace(/^@/, '').toLowerCase() || 'viewer';
      const existing = this.players.get(uid) || {
        id: uid,
        username: uid,
        nickname: nickname || user || uid,
        avatar: avatar || '',
        score: 0,
        metric: '',
      };
      if (nickname) existing.nickname = nickname;
      if (avatar) existing.avatar = avatar;
      existing.score = Number(absScore || 0);
      if (metricText) existing.metric = metricText;
      this.players.set(uid, existing);
      return existing;
    },

    clearRoundPlayers() {
      this.players.clear();
    },

    getSortedPlayers() {
      return [...this.players.values()].sort((a, b) => b.score - a.score);
    },

    async pushStateToServer(extraStatus = 'running') {
      if (!location.protocol.startsWith('http')) return;
      try {
        const list = this.getSortedPlayers().slice(0, 25);
        await fetch('/api/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ players: list, status: extraStatus }),
        });
      } catch (e) {}
    },

    renderAvatarHtml(avatarUrl, name, uid, cls = 'gfx-avatar-img') {
      const bg = avatarColor(uid || name);
      const init = escapeHtml(initialLetter(name || uid));
      if (avatarUrl) {
        return `<img src="${escapeHtml(avatarUrl)}" class="${cls}" alt="" onerror="this.outerHTML='<div class=\'${cls}\' style=\'background:${bg}\'>${init}</div>'">`;
      }
      return `<div class="${cls}" style="background:${bg}">${init}</div>`;
    },

    showGiftBanner(ev) {
      this.init();
      const cmd = ev.command || '';
      if (!cmd || cmd === '__settings__') return;

      const uid = String(ev.user || 'viewer').replace(/^@/, '');
      const nick = ev.nickname || uid;
      const coins = Number(ev.coins || 0);
      const count = Math.max(1, Number(ev.count || 1));
      const isGift = (ev.trigger_type || 'gift') === 'gift' && (ev.gift_name || ev.gift_icon);
      const giftIcon = ev.gift_icon || (isGift ? 'assets/gift_rose.png' : 'assets/default_gift.svg');
      const cmdLabel = ev.command_label || cmd;

      this.lastGifter = uid.toLowerCase();

      if (coins >= 20) this.playSound('assets/sounds/gem.wav', 0.55);
      else this.playSound('assets/sounds/coin.wav', 0.42);

      const stack = document.getElementById('gfxGiftStack');
      const cKey = `${uid}:${ev.gift_name || cmd}`;
      let entry = this.comboMap.get(cKey);

      if (entry && entry.el && entry.el.parentElement === stack) {
        entry.total += count;
        clearTimeout(entry.timer);
        const comboEl = entry.el.querySelector('.gfx-combo');
        if (comboEl) {
          comboEl.textContent = `x${entry.total}`;
          comboEl.style.animation = 'none';
          void comboEl.offsetWidth;
          comboEl.style.animation = 'gfxComboPulse 0.35s ease';
        }
        entry.timer = setTimeout(() => this._removeCard(cKey), 3600);
      } else {
        const card = document.createElement('div');
        card.className = 'gfx-gift-card' + (coins >= 30 ? ' high-tier' : '');
        card.innerHTML = `
          <div class="gfx-avatar-wrap">
            ${this.renderAvatarHtml(ev.avatar, nick, uid, 'gfx-avatar-img')}
          </div>
          <div class="gfx-user-col">
            <div class="gfx-nick">${escapeHtml(nick)}</div>
            <div class="gfx-uid">@${escapeHtml(uid)}</div>
            <div class="gfx-cmd-pill">${escapeHtml(ev.gift_name ? ev.gift_name + ' • ' + cmdLabel : cmdLabel)}</div>
          </div>
          <div class="gfx-gift-visual">
            <img src="${escapeHtml(giftIcon)}" class="gfx-gift-icon" alt="" onerror="this.src='assets/default_gift.svg'">
            <span class="gfx-combo">x${count}</span>
          </div>
        `;
        stack.prepend(card);
        while (stack.children.length > 4) {
          stack.lastElementChild.remove();
        }
        const timer = setTimeout(() => this._removeCard(cKey), 3600);
        this.comboMap.set(cKey, { el: card, total: count, timer });
      }

      if (coins >= 20 || count >= 3) {
        const spot = document.getElementById('gfxSpotlight');
        spot.innerHTML = `
          ${ev.gift_icon ? `<img src="${escapeHtml(ev.gift_icon)}" style="width:28px;height:28px;object-fit:contain;" alt="">` : ''}
          <span style="font-weight:800;color:#fff;">${escapeHtml(nick)}</span>
          <span style="color:#93c5fd;font-weight:700;">${escapeHtml(this.t().activated)} ${escapeHtml(cmdLabel)}</span>
        `;
        spot.classList.add('active');
        clearTimeout(this._spotTimer);
        this._spotTimer = setTimeout(() => spot.classList.remove('active'), 2200);
      }
    },

    _removeCard(cKey) {
      const entry = this.comboMap.get(cKey);
      if (!entry) return;
      this.comboMap.delete(cKey);
      if (entry.el) {
        entry.el.classList.add('leaving');
        setTimeout(() => entry.el && entry.el.remove(), 280);
      }
    },

    showRoundVictory({ title, subtitle, players, metricUnit, durationSec = 8, onReset = null }) {
      this.init();
      this._onResetCb = onReset;
      this.playSound('assets/sounds/victory.mp3', 0.65);
      this._startConfetti();

      const unit = metricUnit || this.t().points;
      const list = (players && players.length ? players : this.getSortedPlayers()).slice(0, 8);
      document.getElementById('gfxLbTitle').textContent = title || this.t().roundEnd;
      document.getElementById('gfxLbSub').textContent = subtitle || this.t().topPlayers;
      document.getElementById('gfxBtnNextRound').textContent = this.t().startNow;

      const podiumEl = document.getElementById('gfxPodium');
      const p1 = list[0] || null;
      const p2 = list[1] || null;
      const p3 = list[2] || null;

      const slotHtml = (p, rank) => {
        if (!p) {
          return `<div class="gfx-podium-slot rank-${rank}" style="opacity:0.35;"><span class="gfx-podium-rank">#${rank}</span><div class="gfx-podium-name">—</div></div>`;
        }
        const val = p.metric || `${Math.round(p.score)} ${unit}`;
        return `
          <div class="gfx-podium-slot rank-${rank}">
            <span class="gfx-podium-rank">#${rank}</span>
            ${this.renderAvatarHtml(p.avatar, p.nickname, p.username, 'gfx-podium-ava')}
            <div class="gfx-podium-name">${escapeHtml(p.nickname || p.username)}</div>
            <div style="font-family:'Inter',sans-serif;font-size:10.5px;color:rgba(148,163,184,0.8);direction:ltr;">@${escapeHtml(p.username || p.id)}</div>
            <div class="gfx-podium-score">${escapeHtml(val)}</div>
          </div>
        `;
      };

      podiumEl.innerHTML = slotHtml(p2, 2) + slotHtml(p1, 1) + slotHtml(p3, 3);

      const rest = list.slice(3, 8);
      const listEl = document.getElementById('gfxLbList');
      listEl.innerHTML = rest.length ? rest.map((p, idx) => `
        <div class="gfx-lb-row">
          <div style="display:flex;align-items:center;gap:9px;">
            <span style="font-family:'Inter',sans-serif;font-weight:800;color:#94a3b8;width:22px;">#${idx + 4}</span>
            ${this.renderAvatarHtml(p.avatar, p.nickname, p.username, 'gfx-avatar-img" style="width:26px;height:26px;font-size:11px;')}
            <strong>${escapeHtml(p.nickname || p.username)}</strong>
            <span style="font-family:'Inter',sans-serif;font-size:11px;color:#64748b;direction:ltr;">@${escapeHtml(p.username || p.id)}</span>
          </div>
          <strong style="font-family:'Inter',sans-serif;color:#93c5fd;">${escapeHtml(p.metric || (Math.round(p.score) + ' ' + unit))}</strong>
        </div>
      `).join('') : '';

      const backdrop = document.getElementById('gfxLbBackdrop');
      backdrop.classList.add('open');

      clearInterval(this.countdownTimer);
      const totalMs = durationSec * 1000;
      const start = Date.now();
      const bar = document.getElementById('gfxLbBar');
      const lbl = document.getElementById('gfxLbCountdown');
      bar.style.width = '100%';

      this.countdownTimer = setInterval(() => {
        const elapsed = Date.now() - start;
        const rem = Math.max(0, totalMs - elapsed);
        bar.style.width = `${(rem / totalMs) * 100}%`;
        lbl.textContent = this.t().autoStartIn(Math.ceil(rem / 1000));
        if (rem <= 0) {
          clearInterval(this.countdownTimer);
          const cb = this._onResetCb;
          this.hideLeaderboard();
          if (cb) cb();
        }
      }, 100);
    },

    hideLeaderboard() {
      clearInterval(this.countdownTimer);
      this._stopConfetti();
      const backdrop = document.getElementById('gfxLbBackdrop');
      if (backdrop) backdrop.classList.remove('open');
    },

    _startConfetti() {
      const cnv = document.getElementById('gfxConfettiCanvas');
      if (!cnv) return;
      const ctx = cnv.getContext('2d');
      cnv.width = window.innerWidth;
      cnv.height = window.innerHeight;
      const colors = ['#60a5fa', '#fbbf24', '#34d399', '#f87171', '#a78bfa', '#f8fafc'];
      const pieces = Array.from({ length: 110 }, () => ({
        x: Math.random() * cnv.width,
        y: -20 - Math.random() * cnv.height * 0.5,
        w: 6 + Math.random() * 6,
        h: 10 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 3.2,
        vy: 2.6 + Math.random() * 4.2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.18,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      cancelAnimationFrame(this.confettiAnim);
      const step = () => {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        pieces.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;
          if (p.y > cnv.height + 20) {
            p.y = -15;
            p.x = Math.random() * cnv.width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        });
        this.confettiAnim = requestAnimationFrame(step);
      };
      step();
    },

    _stopConfetti() {
      cancelAnimationFrame(this.confettiAnim);
      const cnv = document.getElementById('gfxConfettiCanvas');
      if (cnv) {
        const ctx = cnv.getContext('2d');
        ctx.clearRect(0, 0, cnv.width, cnv.height);
      }
    },

    startPolling({ onEvent, onSettings }) {
      this.init();
      if (!location.protocol.startsWith('http')) return;
      let lastSeq = 0;
      let initializedSettings = false;
      setInterval(async () => {
        try {
          const r = await fetch(`/api/events?since=${lastSeq}`);
          const d = await r.json();
          if (!initializedSettings && d.settings && onSettings) {
            initializedSettings = true;
            if (typeof d.settings.sound_muted === 'boolean') this.setMuted(d.settings.sound_muted);
            if (d.settings.lang) this.setLang(d.settings.lang);
            onSettings(d.settings);
          }
          for (const ev of (d.events || [])) {
            if (ev.seq > lastSeq) lastSeq = ev.seq;
            if (ev.command === '__shutdown__') {
              try { window.close(); } catch(e){}
            } else if (ev.command === '__settings__' && ev.settings) {
              if (typeof ev.settings.sound_muted === 'boolean') this.setMuted(ev.settings.sound_muted);
              if (ev.settings.lang) this.setLang(ev.settings.lang);
              if (onSettings) onSettings(ev.settings);
            } else {
              this.showGiftBanner(ev);
              if (onEvent) onEvent(ev);
            }
          }
        } catch (e) {}
      }, 70);
    },
  };

  window.GameFX = GameFX;
})();
