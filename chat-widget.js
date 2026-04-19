/**
 * Juvenis Medical — Front Desk Assistant Widget
 * Scripted chatbot — no AI, no external APIs, no free-text input.
 * All responses are pre-approved. Medical questions route to consultation booking.
 *
 * Usage (root pages):      <script src="chat-widget.js"></script>
 * Usage (subdir pages):    <script src="../chat-widget.js" data-base="../"></script>
 */
(function () {
  'use strict';

  // Detect base path for links (handles root and one-level-deep pages)
  const scriptEl = document.currentScript || document.querySelector('script[src*="chat-widget"]');
  const base = (scriptEl && scriptEl.dataset.base) ? scriptEl.dataset.base : '';

  const CSS = `
    #jv-chat-btn {
      position: fixed; bottom: 24px; right: 24px;
      width: 56px; height: 56px; border-radius: 50%;
      background: #C9963A; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(201,150,58,.4);
      z-index: 9998; transition: transform .2s, background .2s;
    }
    #jv-chat-btn:hover { background: #D4A347; transform: scale(1.05); }
    #jv-chat-btn svg { width: 24px; height: 24px; pointer-events: none; }

    #jv-chat-panel {
      position: fixed; bottom: 92px; right: 24px;
      width: 360px; max-height: 530px;
      background: #13151C; border: 1px solid #252836;
      border-radius: 16px; display: none; flex-direction: column;
      box-shadow: 0 8px 40px rgba(0,0,0,.55);
      z-index: 9999; overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 13px; line-height: 1.5;
    }
    #jv-chat-panel.open { display: flex; }

    @media (max-width: 420px) {
      #jv-chat-panel { width: calc(100vw - 24px); right: 12px; bottom: 84px; }
      #jv-chat-btn   { bottom: 16px; right: 16px; }
    }

    .jv-hdr {
      background: #1A1D27; border-bottom: 1px solid #252836;
      padding: 13px 16px; display: flex; align-items: center;
      justify-content: space-between; flex-shrink: 0;
    }
    .jv-hdr-left { display: flex; align-items: center; gap: 10px; }
    .jv-hdr-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(201,150,58,.12); border: 1px solid rgba(201,150,58,.25);
      display: flex; align-items: center; justify-content: center; font-size: 15px;
    }
    .jv-hdr-name  { font-size: 13px; font-weight: 700; color: #E8EAF0; }
    .jv-hdr-sub   { font-size: 11px; color: #7A8499; }
    .jv-hdr-close {
      background: none; border: none; cursor: pointer;
      color: #7A8499; padding: 4px; transition: color .2s;
    }
    .jv-hdr-close:hover { color: #E8EAF0; }

    .jv-disclaimer {
      background: rgba(201,150,58,.06); border-bottom: 1px solid rgba(201,150,58,.1);
      padding: 6px 14px; font-size: 10.5px; color: rgba(201,150,58,.65);
      text-align: center; flex-shrink: 0; letter-spacing: .01em;
    }

    .jv-msgs {
      flex: 1; overflow-y: auto; padding: 14px 13px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .jv-msgs::-webkit-scrollbar { width: 3px; }
    .jv-msgs::-webkit-scrollbar-thumb { background: #252836; border-radius: 2px; }

    .jv-bubble {
      max-width: 92%; padding: 9px 12px; border-radius: 12px;
      font-size: 13px; color: #D8DBE8; line-height: 1.55;
    }
    .jv-bubble.bot {
      background: #1C1F2E; border: 1px solid #252836;
      align-self: flex-start; border-bottom-left-radius: 3px;
    }
    .jv-bubble.bot b, .jv-bubble.bot strong { color: #C9963A; font-weight: 600; }
    .jv-bubble.user {
      background: rgba(201,150,58,.13); border: 1px solid rgba(201,150,58,.22);
      color: #C9963A; align-self: flex-end; border-bottom-right-radius: 3px;
    }

    .jv-qrs {
      display: flex; flex-wrap: wrap; gap: 6px;
      align-self: flex-start; max-width: 100%;
    }
    .jv-qr {
      background: #1A1D27; border: 1px solid #2E3245;
      border-radius: 100px; padding: 5px 11px;
      font-size: 12px; color: #C9963A; cursor: pointer;
      transition: all .15s; font-family: inherit;
    }
    .jv-qr:hover { background: rgba(201,150,58,.1); border-color: rgba(201,150,58,.35); }

    .jv-action {
      display: inline-block; background: #C9963A; color: #0D0F14 !important;
      text-decoration: none !important; border-radius: 8px;
      padding: 8px 15px; font-size: 13px; font-weight: 700;
      margin-top: 7px; transition: background .2s; align-self: flex-start;
    }
    .jv-action:hover { background: #D4A347 !important; }
  `;

  // ── FLOWS ─────────────────────────────────────────────────────────────────
  function flows(b) {
    return {
      start: {
        msg: "Hi! 👋 I can answer common questions about Juvenis Medical and help you find the right next step.",
        replies: [
          { label: "Am I a good fit?",       next: "qualify"   },
          { label: "How does it work?",       next: "process"   },
          { label: "Services & telehealth",   next: "services"  },
          { label: "Costs & insurance",       next: "costs"     },
          { label: "I'm ready to book",       next: "book"      },
        ]
      },
      qualify: {
        msg: "The quickest way to find out is our 2-minute qualifier tool. It checks your location and what you're looking for, then shows you exactly which services apply to you.",
        action: { label: "Take the Qualifier →", url: b + "start.html" },
        replies: [
          { label: "Tell me more first", next: "about"  },
          { label: "Start over",         next: "start"  },
        ]
      },
      about: {
        msg: "Juvenis Medical is a direct-care integrative health clinic in Fort Lauderdale, FL. Dr. Paul Goodkin has 20+ years of clinical experience and specializes in peptide therapy, hormone optimization, medical weight loss, and men's & women's health. All care plans are built around individual lab results.",
        replies: [
          { label: "Am I a good fit?",     next: "qualify"  },
          { label: "Services & telehealth", next: "services" },
          { label: "Start over",            next: "start"    },
        ]
      },
      process: {
        msg: "Here's how it works:\n\n<b>1.</b> Free 15-min consultation with Dr. Paul\n<b>2.</b> Comprehensive lab work (70+ factors)\n<b>3.</b> Personalized protocol built around your results\n<b>4.</b> Medications from licensed pharmacies, shipped to you\n<b>5.</b> Ongoing monitoring and adjustments\n\nAfter booking you'll receive intake forms to complete before your appointment.",
        replies: [
          { label: "What happens after I book?", next: "afterbook" },
          { label: "How do I get started?",      next: "book"     },
          { label: "Start over",                 next: "start"    },
        ]
      },
      afterbook: {
        msg: "After you book a consultation:\n\n• You'll receive a confirmation email with a short intake form\n• Complete it at your own pace — takes about 5 minutes\n• Dr. Paul reviews your info before your call\n• The clinic follows up to coordinate labs and next steps",
        replies: [
          { label: "Book now",   next: "book"  },
          { label: "Start over", next: "start" },
        ]
      },
      services: {
        msg: "Here's a quick breakdown by availability:\n\n🌍 <b>All 50 states:</b> Peptide therapy, Medical weight loss\n🌴 <b>Florida residents:</b> TRT, BHRT, Men's hormone panel\n🏥 <b>In-person (anyone):</b> Full range of services\n\nNot sure what applies to you?",
        action: { label: "Check My Options →", url: b + "start.html" },
        replies: [
          { label: "Peptide therapy", next: "peptides"   },
          { label: "Testosterone / TRT", next: "trt"    },
          { label: "Medical weight loss", next: "wtloss" },
          { label: "Women's BHRT",    next: "bhrt"       },
          { label: "Start over",      next: "start"      },
        ]
      },
      peptides: {
        msg: "Peptide therapy at Juvenis Medical includes compounds such as BPC-157, Sermorelin, Ipamorelin/CJC-1295, NAD+, and others. These are used to support recovery, energy, body composition, and cellular health.\n\nAvailable via telehealth to all 50 states.\n\nFor questions about whether peptide therapy is appropriate for your situation, the free consultation is the right place to ask.",
        action: { label: "Book a Consultation →", url: b + "contact.html" },
        replies: [
          { label: "Back to services", next: "services" },
          { label: "Start over",       next: "start"    },
        ]
      },
      trt: {
        msg: "Testosterone Replacement Therapy at Juvenis Medical is lab-guided — bloodwork is reviewed before any protocol is started. TRT telehealth is available to Florida residents. Out-of-state patients are welcome to visit our Fort Lauderdale clinic in person.\n\nWhether TRT is appropriate for you is a clinical determination made after your evaluation — not something I can assess here.",
        action: { label: "Book a Consultation →", url: b + "contact.html" },
        replies: [
          { label: "Check my options", next: "qualify"  },
          { label: "Start over",       next: "start"    },
        ]
      },
      wtloss: {
        msg: "Juvenis Medical offers medically supervised weight loss including GLP-1 therapy. Programs are personalized based on lab work and individual health goals. Available via telehealth to all 50 states. All medications are sourced from licensed compounding pharmacies.",
        action: { label: "Book a Consultation →", url: b + "contact.html" },
        replies: [
          { label: "Back to services", next: "services" },
          { label: "Start over",       next: "start"    },
        ]
      },
      bhrt: {
        msg: "Bioidentical Hormone Replacement Therapy (BHRT) is available for women and is lab-guided. Many patients seek support for perimenopause, menopause, and hormone balance. BHRT telehealth is available to Florida residents. In-person visits at our Fort Lauderdale clinic are open to all patients.",
        action: { label: "Book a Consultation →", url: b + "contact.html" },
        replies: [
          { label: "Back to services", next: "services" },
          { label: "Start over",       next: "start"    },
        ]
      },
      costs: {
        msg: "Juvenis Medical is a <b>cash-pay practice</b> — no insurance accepted. This keeps care direct and transparent with no authorization delays or surprise bills.\n\nCosts vary by service and protocol. Dr. Paul provides clear pricing during the free consultation before any commitment. HSA/FSA cards are accepted.",
        replies: [
          { label: "Book a free consultation", next: "book"  },
          { label: "Start over",               next: "start" },
        ]
      },
      book: {
        msg: "You can book a free 15-minute consultation with Dr. Paul directly. No commitment and no cost.",
        action: { label: "Book Now →", url: b + "contact.html" },
        replies: [
          { label: "Start over", next: "start" },
        ]
      }
    };
  }

  // ── INIT ──────────────────────────────────────────────────────────────────
  function init() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <button id="jv-chat-btn" aria-label="Open chat assistant">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      <div id="jv-chat-panel" role="dialog" aria-modal="true" aria-label="Juvenis Medical front desk assistant">
        <div class="jv-hdr">
          <div class="jv-hdr-left">
            <div class="jv-hdr-avatar">💬</div>
            <div>
              <div class="jv-hdr-name">Juvenis Medical</div>
              <div class="jv-hdr-sub">Front Desk Assistant</div>
            </div>
          </div>
          <button class="jv-hdr-close" id="jv-close-btn" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="jv-disclaimer">ℹ️ General information only &nbsp;·&nbsp; Not medical advice</div>
        <div class="jv-msgs" id="jv-msgs"></div>
      </div>
    `;
    document.body.appendChild(wrap);

    document.getElementById('jv-chat-btn').addEventListener('click', toggle);
    document.getElementById('jv-close-btn').addEventListener('click', toggle);

    showFlow('start');
  }

  function toggle() {
    document.getElementById('jv-chat-panel').classList.toggle('open');
  }

  function nl2br(s) { return s.replace(/\n/g, '<br>'); }

  function showFlow(key) {
    const f = flows(base)[key];
    if (!f) return;
    const msgs = document.getElementById('jv-msgs');

    // Bot bubble
    const bubble = document.createElement('div');
    bubble.className = 'jv-bubble bot';
    bubble.innerHTML = nl2br(f.msg);
    msgs.appendChild(bubble);

    // Action button
    if (f.action) {
      const a = document.createElement('a');
      a.className = 'jv-action';
      a.href = f.action.url;
      a.textContent = f.action.label;
      msgs.appendChild(a);
    }

    // Quick replies
    if (f.replies && f.replies.length) {
      const qrs = document.createElement('div');
      qrs.className = 'jv-qrs';
      f.replies.forEach(r => {
        const btn = document.createElement('button');
        btn.className = 'jv-qr';
        btn.textContent = r.label;
        btn.addEventListener('click', () => {
          // Remove all quick reply groups
          msgs.querySelectorAll('.jv-qrs').forEach(el => el.remove());
          // User bubble
          const ub = document.createElement('div');
          ub.className = 'jv-bubble user';
          ub.textContent = r.label;
          msgs.appendChild(ub);
          setTimeout(() => showFlow(r.next), 280);
        });
        qrs.appendChild(btn);
      });
      msgs.appendChild(qrs);
    }

    setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 60);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
