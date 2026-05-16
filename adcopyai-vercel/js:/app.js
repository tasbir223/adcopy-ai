/* ═══════════════════════════════════════════════════════════
   AdCopyAI — app.js
   API calls go to /api/generate (Vercel serverless function)
   which keeps the Anthropic key secret server-side.
   ═══════════════════════════════════════════════════════════ */


/* ─── Navigation ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ─── Scroll Fade-In ─────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* ─── Platform Pills (multi-select) ─────────────────────── */
document.querySelectorAll('.platform-pill').forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('active'));
});


/* ─── Tone Pills (single-select) ────────────────────────── */
document.querySelectorAll('.tone-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tone-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


/* ─── Generator ──────────────────────────────────────────── */

async function generateCopy() {
  const brand    = document.getElementById('brand-name').value.trim();
  const industry = document.getElementById('industry').value;
  const product  = document.getElementById('product').value.trim();
  const audience = document.getElementById('audience').value.trim();
  const goal     = document.getElementById('goal').value;
  const extra    = document.getElementById('extra').value.trim();

  const platforms = [...document.querySelectorAll('.platform-pill.active')]
                      .map(b => b.dataset.platform)
                      .join(', ') || 'Instagram';

  const tone = document.querySelector('.tone-pill.active')?.dataset.tone || 'Bold & Confident';

  if (!brand || !product) {
    showError('Please fill in your Brand Name and Product Description at minimum.');
    return;
  }

  setLoading(true);
  hideError();

  const prompt = `You are an expert marketing copywriter specialising in high-converting ad copy for social media.

Generate compelling ad copy for the following brand:

Brand: ${brand}
Industry: ${industry || 'General'}
Product/Service: ${product}
Target Platforms: ${platforms}
Tone/Voice: ${tone}
Target Audience: ${audience || 'General consumers'}
Campaign Goal: ${goal || 'Drive sales'}
Extra Details: ${extra || 'None'}

Generate exactly 10 pieces of ad copy. Return ONLY a valid JSON array — no markdown, no backticks, no explanation:
[
  {"type": "Slogan",                  "platform": "Any",         "text": "..."},
  {"type": "Instagram Caption",       "platform": "Instagram",   "text": "..."},
  {"type": "TikTok Hook",             "platform": "TikTok",      "text": "..."},
  {"type": "Facebook Ad",             "platform": "Facebook",    "text": "..."},
  {"type": "Twitter/X Post",          "platform": "Twitter/X",   "text": "..."},
  {"type": "Email Subject Line",      "platform": "Email",       "text": "..."},
  {"type": "YouTube Ad Script",       "platform": "YouTube",     "text": "..."},
  {"type": "LinkedIn Post",           "platform": "LinkedIn",    "text": "..."},
  {"type": "Product Headline",        "platform": "Web/Shopify", "text": "..."},
  {"type": "SMS / Push Notification", "platform": "SMS",         "text": "..."}
]

Make every piece punchy, creative, and tailored to the brand voice. Use emojis where appropriate.`;

  try {
    // Calls YOUR Vercel function — not Anthropic directly
    // Your API key stays safe on the server
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}`);
    }

    const text = data.content?.[0]?.text || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Could not parse response. Please try again.');

    const items = JSON.parse(jsonMatch[0]);
    renderResults(items);

  } catch (err) {
    showError('Error: ' + (err.message || 'Something went wrong. Please try again.'));
  } finally {
    setLoading(false);
  }
}


/* ─── Render Results ─────────────────────────────────────── */

function renderResults(items) {
  const grid    = document.getElementById('results-grid');
  const section = document.getElementById('results-section');

  grid.innerHTML = '';
  section.style.display = 'block';

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.animationDelay = (i * 60) + 'ms';
    card.innerHTML = `
      <div class="result-type">✦ ${item.type} <span>(${item.platform})</span></div>
      <p class="result-text">${item.text}</p>
      <button class="copy-btn" onclick="copyText(this, \`${escapeBacktick(item.text)}\`)">Copy</button>
    `;
    grid.appendChild(card);
  });

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ─── Clipboard ──────────────────────────────────────────── */

function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.style.color = 'var(--amber)';
    btn.style.borderColor = 'var(--amber)';
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  });
}


/* ─── UI Helpers ─────────────────────────────────────────── */

function escapeBacktick(str) {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function setLoading(on) {
  const btn     = document.getElementById('gen-btn');
  const txt     = document.getElementById('gen-btn-text');
  const spinner = document.getElementById('gen-spinner');
  btn.disabled          = on;
  txt.textContent       = on ? 'Generating…' : '✦ Generate Ad Copy';
  spinner.style.display = on ? 'block' : 'none';
}

function showError(msg) {
  const el = document.getElementById('gen-error');
  el.textContent = msg;
  el.style.display = 'block';
}

function hideError() {
  document.getElementById('gen-error').style.display = 'none';
}
