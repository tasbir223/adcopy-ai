# AdCopyAI ✦

> AI-powered ad copy generator for every social media platform and every business.

![AdCopyAI](https://img.shields.io/badge/Powered%20by-Claude%20AI-f59e0b?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-slate?style=for-the-badge)

---

## What It Does

AdCopyAI generates 10 pieces of high-converting ad copy in seconds — tailored to your brand, tone, audience, and platform. No copywriting experience needed.

**Generated copy includes:**
- Brand slogans
- Instagram captions
- TikTok hooks
- Facebook ads
- Twitter/X posts
- Email subject lines
- YouTube ad scripts
- LinkedIn posts
- Product headlines
- SMS / push notifications

---

## Features

- ⚡ **Instant** — results in under 10 seconds
- 🎯 **Platform-optimized** — copy written for each platform's culture
- 🎨 **Tone matching** — bold, luxury, playful, minimal, edgy, and more
- 🏪 **Any industry** — fashion, food, tech, beauty, fitness, and more
- 📋 **One-click copy** — paste straight into your ad manager
- 🔄 **Unlimited regeneration** — tweak and regenerate as many times as you want
- 🔒 **Secure** — your Anthropic API key is never exposed to the browser

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript (single file) |
| Backend | Vercel Serverless Functions |
| AI | Anthropic Claude claude-sonnet-4-6 |
| Hosting | Vercel |

---

## Project Structure

```
adcopy-ai/
├── index.html        ← Full frontend (HTML + CSS + JS)
├── vercel.json       ← Vercel routing config
└── api/
    └── generate.js   ← Serverless function (API key lives here)
```

---

## Deploy Your Own

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/adcopy-ai.git
cd adcopy-ai
```

### 2. Get an Anthropic API key
Sign up at [console.anthropic.com](https://console.anthropic.com) and create an API key.

### 3. Deploy to Vercel
- Push to GitHub
- Import the repo at [vercel.com](https://vercel.com)
- Add your environment variable:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |

- Click **Deploy**

### 4. Done
Your live URL will appear in the Vercel dashboard.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key — stored securely on Vercel, never exposed to users |

---

## How It Works

1. User fills in brand details, selects platforms and tone
2. Frontend sends the prompt to `/api/generate` (your Vercel function)
3. Vercel function calls the Anthropic API using your secret key
4. Results are returned and displayed as copyable cards

The API key never touches the browser — it stays safely on Vercel's servers.

---

## License

MIT — free to use, modify, and deploy.
