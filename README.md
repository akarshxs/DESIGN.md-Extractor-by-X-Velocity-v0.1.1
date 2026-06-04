<p align="center">
  <img src="https://raw.githubusercontent.com/akarshxs/DESIGN.md-Extractor-by-X-Velocity-v0.1.1/main/icon128.png" alt="DESIGN.md Extractor Icon" width="120" height="120" style="border-radius:24px;" />
</p>

<h1 align="center">DESIGN.md Extractor</h1>
<h3 align="center">by &nbsp;<a href="https://xvelocity.org">/// X VELOCITY.</a></h3>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.1-white?style=flat-square&labelColor=000" alt="version" />
  <img src="https://img.shields.io/badge/manifest-v3-blue?style=flat-square&labelColor=000" alt="MV3" />
  <img src="https://img.shields.io/badge/browser-Chrome-yellow?style=flat-square&labelColor=000&logo=googlechrome" alt="Chrome" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square&labelColor=000" alt="MIT" />
  <a href="https://t.me/+f-9oAHhGc28yZjQ1">
    <img src="https://img.shields.io/badge/community-Telegram-2CA5E0?style=flat-square&labelColor=000&logo=telegram" alt="Telegram" />
  </a>
</p>

<p align="center">
  A Chrome Extension that scans any live webpage in real time and generates<br/>
  implementation-ready <strong>DESIGN.md</strong> and <strong>SKILL.md</strong> files —<br/>
  ready to drop into <strong>Claude Code</strong>, <strong>OpenAI Codex</strong>, or <strong>Cursor</strong>.
</p>

<p align="center">
  <a href="https://github.com/akarshxs/DESIGN.md-Extractor-by-X-Velocity-v0.1.1">⭐ Star this repo</a> &nbsp;·&nbsp;
  <a href="https://github.com/akarshxs/DESIGN.md-Extractor-by-X-Velocity-v0.1.1/issues">🐛 Report a Bug</a> &nbsp;·&nbsp;
  <a href="https://t.me/+f-9oAHhGc28yZjQ1">💬 Join Community</a>
</p>

---

## 🧠 What Is This?

AI coding tools like **Claude Code**, **OpenAI Codex**, and **Cursor** generate far better UI when they understand a project's design system — the exact colors, fonts, spacing, component patterns, and brand rules used on the actual site.

**DESIGN.md Extractor** automates that entire context-building workflow:

```
Open any website  →  Click the extension  →  Get DESIGN.md + SKILL.md  →  Drop into your AI tool
```

No manual token hunting. No copy-pasting hex codes. No guessing font stacks.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Full Token Extraction** | Captures typography, colors, spacing, border-radius, shadows, and motion values from up to 1000 DOM elements per run |
| 🧩 **Token Normalization** | Deduplicates raw values and groups them into semantic token sets |
| 🔍 **Website Profiling** | Auto-detects site type (SaaS, docs, e-commerce, blog, dashboard) and infers brand audience and surface type |
| ✅ **Conformance Validation** | Validates the output against required headings, accessibility targets, and state coverage rules |
| 📦 **ZIP Download** | Exports `{sitename}_design.zip` via OS-native Save As dialog |
| ⚡ **Quick Install** | One-click ZIP pre-labeled for Claude Code, OpenAI Codex, or Cursor |
| ℹ️ **Info Panel** | Live pipeline stats — elements sampled, token counts, profiling confidence, pass rate |
| 🌑 **Dark Theme UI** | BMW M–inspired black canvas interface with X Velocity gradient branding |

---

## 📦 Output Files

### `DESIGN.md`
A complete, structured design system document that includes:

- **Brand mission** and design philosophy inferred from the page
- **Color palette** — primary, surface, text, border, and accent tokens
- **Typography scale** — font families, size scale, weights, line heights, letter spacing
- **Spacing system** — margin/padding token grid
- **Border radius tokens**
- **Shadow tokens**
- **Motion/animation values** — duration, easing functions
- **Component patterns** — buttons, forms, inputs, cards, navigation
- **Accessibility guidelines** — contrast targets, focus indicators, ARIA notes
- **Implementation rules** and quality gates for AI use

### `SKILL.md`
An AI skill configuration file that instructs Claude Code / Codex / Cursor how to apply the `DESIGN.md` specification when generating UI code. Includes:

- System context and role definition
- Managed markers for AI editing boundaries
- Style application workflow
- State coverage checklist (default, hover, focus, disabled, error)

---

## 🔄 The 5-Step Pipeline

When you click the extension, it runs a 5-step pipeline:

```
Step 1 — Style Extraction
  └─ Scans up to 1000 DOM elements
  └─ Captures computed CSS: fonts, colors, spacing, radius, shadows, motion

Step 2 — Token Normalization
  └─ Deduplicates raw values
  └─ Groups into reusable semantic token sets

Step 3 — Website Profiling
  └─ Analyzes URL, metadata, headings, nav labels, CTA text, structural signals
  └─ Infers: brand name · audience type · surface type · confidence level

Step 4 — Blueprint Assembly
  └─ Structures tokens into required DESIGN.md sections
  └─ Generates SKILL.md configuration

Step 5 — Conformance Checks
  └─ Validates required headings and sections
  └─ Checks accessibility wording and state coverage
  └─ Reports pass/fail per check
```

---

## 🚀 How to Install in Chrome

> ⏱ Takes less than **60 seconds**. No account. No sign-up. No Chrome Web Store needed.

---

### Step 1 — Download the Extension Files

**Option A — Download as ZIP (easiest)**

1. Go to the repo: [github.com/akarshxs/DESIGN.md-Extractor-by-X-Velocity-v0.1.1](https://github.com/akarshxs/DESIGN.md-Extractor-by-X-Velocity-v0.1.1)
2. Click the green **`<> Code`** button (top right of file list)
3. Click **`Download ZIP`**
4. Once downloaded, **right-click** the ZIP file → **Extract All** (Windows) or double-click (Mac)
5. Note the path of the extracted folder — you'll need it in Step 3

**Option B — Clone with Git**

```bash
git clone https://github.com/akarshxs/DESIGN.md-Extractor-by-X-Velocity-v0.1.1.git
```

---

### Step 2 — Open Chrome Extensions Page

1. Open **Google Chrome**
2. In the address bar, type exactly:
   ```
   chrome://extensions/
   ```
   and press **Enter**

   > 💡 You can also get there via: Chrome menu (⋮) → **Extensions** → **Manage Extensions**

3. You'll see the Extensions management page

---

### Step 3 — Enable Developer Mode

> This is required to install extensions that aren't from the Chrome Web Store.

1. Look at the **top-right corner** of the Extensions page
2. Find the toggle labelled **"Developer mode"**
3. Click it to turn it **ON** — it turns blue when active
4. Three new buttons will appear: `Load unpacked` · `Pack extension` · `Update`

```
┌─────────────────────────────────────────────────────┐
│  Extensions                     [Developer mode ●]  │
│                                                     │
│  [Load unpacked]  [Pack extension]  [Update]        │
└─────────────────────────────────────────────────────┘
```

---

### Step 4 — Load the Extension

1. Click **`Load unpacked`** (first of the three new buttons)
2. A file picker dialog opens
3. Navigate to the folder you extracted in Step 1
4. **Select the folder** that contains `manifest.json` — do **not** go inside it, just select the folder itself

   > ✅ Correct: select `DESIGN.md-Extractor-by-X-Velocity-v0.1.1/`  
   > ❌ Wrong: select `DESIGN.md-Extractor-by-X-Velocity-v0.1.1/icons/`

5. Click **Select Folder** (Windows) or **Open** (Mac)

---

### Step 5 — Confirm It's Installed

After selecting the folder, the extension card appears on the Extensions page:

```
┌─────────────────────────────────────────────────────┐
│  🟦  DESIGN.md Extractor by X Velocity              │
│      Version 0.1.1                                  │
│      ● Enabled                          [Details]   │
└─────────────────────────────────────────────────────┘
```

✅ **You're done!**

---

### Step 6 — Pin It to Your Toolbar

1. Click the **puzzle piece icon** 🧩 in the top-right of Chrome (next to the address bar)
2. Find **"DESIGN.md Extractor by X Velocity"** in the dropdown
3. Click the **📌 pin icon** next to it
4. The extension icon now appears permanently in your Chrome toolbar

---

### Step 7 — Use It

1. Navigate to **any website** in Chrome
2. Click the **DESIGN.md Extractor** icon in your toolbar
3. The popup opens and automatically starts extracting
4. Your `DESIGN.md` and `SKILL.md` are ready in seconds

---

### ⚠️ Troubleshooting

| Problem | Fix |
|---|---|
| `Manifest file is missing or unreadable` | You selected the wrong folder — make sure `manifest.json` is directly inside the folder you selected |
| Extension doesn't appear after loading | Refresh `chrome://extensions/` and check for error messages on the card |
| Popup shows "Cannot access tab" | You're on a Chrome internal page (`chrome://`, `about:`) — navigate to a real website first |
| Extraction returns empty | Wait for the page to fully load, then click **Re-analyze** (🔄 button) |
| ZIP download doesn't open file picker | Check that Chrome has download permissions — go to `chrome://settings/content/automaticDownloads` |

---

## 📖 How to Use

**Step 1** — Navigate to any website in Chrome you want to analyze.

**Step 2** — Click the **DESIGN.md Extractor** icon in the Chrome toolbar.

**Step 3** — The extension auto-runs on load. Watch the extraction complete in the popup.

**Step 4** — Switch between the **DESIGN.md** and **SKILL.md** tabs to preview the output.

**Step 5** — Use the top-right action buttons:
| Button | Action |
|---|---|
| 📋 Copy | Copy the active tab content to clipboard |
| ⬇ Download | Download the active file individually |
| 🔄 Re-analyze | Re-run extraction on the current page |
| ℹ️ Info | View the pipeline stats and generation report |

**Step 6** — Click a **Quick Install** button to download a `{sitename}_design.zip` containing both files, ready for your AI tool:

| Button | For |
|---|---|
| Claude Code | Anthropic Claude Code projects |
| Codex | OpenAI Codex / ChatGPT projects |
| Cursor | Cursor IDE projects |

**Step 7** — Add the files to your project folder and include them in your AI context.

---

## 📁 Project Structure

```
DESIGN.md-Extractor-by-X-Velocity-v0.1.1/
│
├── manifest.json              # MV3 Chrome extension manifest
├── popup.html                 # Extension popup UI (530×620px)
├── popup.css                  # Dark theme — X Velocity design language
├── popup.js                   # Main JS: extraction, normalization, download logic
│
├── normalize.mjs              # Token deduplication & semantic grouping
├── generate-design-md.mjs     # DESIGN.md template & content generator
├── generate-skill-md.mjs      # SKILL.md template & content generator
├── validate.mjs               # Conformance checker (headings, a11y, states)
│
├── jszip.min.js               # Bundled JSZip (for ZIP download)
│
└── icons/
    ├── icon16.png             # 16×16 toolbar icon
    ├── icon48.png             # 48×48 extension management icon
    └── icon128.png            # 128×128 Chrome Web Store icon
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Platform | Chrome Extension — Manifest V3 |
| Style Extraction | `chrome.scripting.executeScript` with inline `func` injection |
| Processing | Native ES Modules (`.mjs`) — no build step required |
| ZIP Packaging | [JSZip](https://stuk.github.io/jszip/) — locally bundled, no CDN dependency |
| File Download | `chrome.downloads` API with `saveAs: true` for OS file picker |
| UI | Vanilla HTML + CSS — zero dependencies |
| Fonts | Inter + Fira Code (Google Fonts) |

---

## 🔒 Permissions Explained

| Permission | Why It's Needed |
|---|---|
| `activeTab` | Read the active tab's URL and inject the style extractor into the page |
| `scripting` | Execute the extraction function inside the webpage's context to read computed styles |
| `downloads` | Trigger the OS-level Save As dialog when the user downloads a ZIP |

> ⚠️ This extension **does not** collect, store, or transmit any user data. All processing happens locally in your browser.

---

## 🔧 Compatibility

| Browser | Status |
|---|---|
| Google Chrome 116+ | ✅ Fully supported |
| Microsoft Edge 116+ | ✅ Should work (MV3 compatible) |
| Firefox | ❌ Not supported (uses Chrome-specific APIs) |
| Safari | ❌ Not supported |

---

## ❓ FAQ

**Q: Can I use this on any website?**
Yes — any publicly accessible webpage. It cannot run on Chrome's own internal pages (`chrome://`, `edge://`, `about://`).

**Q: Does it work on Single Page Applications (React, Vue, etc.)?**
Yes. It reads `window.getComputedStyle` directly from the live rendered DOM, so it captures whatever is currently on screen regardless of framework.

**Q: How accurate are the generated files?**
Very accurate for well-structured sites. The token normalization step handles deduplication so common base values (e.g., `16px`, `#000`) don't pollute the output. The profiling step uses multiple signals to minimize false positives.

**Q: Why does it sample only 1000 elements?**
Performance. Most design systems are fully represented within the first 1000 elements. The total node count is still shown in the Info panel for transparency.

**Q: The extracted colors look wrong. Why?**
Some sites use `rgba` values with transparency that collapse to unexpected hex values. Try clicking **Re-analyze** after the page fully loads, or disable browser dark mode.

---

## 🤝 Contributing

Pull requests are welcome! Here's how:

1. Fork this repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test by loading unpacked in Chrome
5. Submit a PR describing what you changed and why

Please keep the zero-dependency philosophy — no npm, no bundlers.

---

## 📣 Community & Support

Built and maintained by **X Velocity**.

| Link | |
|---|---|
| 🌐 Website | [xvelocity.org](https://xvelocity.org) |
| 💬 Telegram Community | [Join → t.me/+f-9oAHhGc28yZjQ1](https://t.me/+f-9oAHhGc28yZjQ1) |
| 🐛 Issues | [GitHub Issues](https://github.com/akarshxs/DESIGN.md-Extractor-by-X-Velocity-v0.1.1/issues) |

---

## 📄 License

MIT License — free to use, modify, and distribute.

```
Copyright (c) 2025 X Velocity

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<p align="center">
  Made with ⚡ by <a href="https://xvelocity.org"><strong>/// X VELOCITY.</strong></a>
  &nbsp;·&nbsp;
  <a href="https://t.me/+f-9oAHhGc28yZjQ1">Support the project on Telegram</a>
</p>
