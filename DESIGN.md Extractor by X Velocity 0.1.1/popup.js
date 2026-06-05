import { normalizeExtractedStyles } from './normalize.mjs';
import { generateDesignMarkdown } from './generate-design-md.mjs';
import { generateSkillMarkdown } from './generate-skill-md.mjs';
import { validateMarkdownOutput } from './validate.mjs';

// ─── Self-contained page extraction (injected via func) ──────────────────────
function extractPageStyles() {
  const elements = Array.from(document.querySelectorAll('body *'));
  const totalElements = elements.length;
  const sampled = elements.slice(0, 1000);

  const typography = [], colors = [], spacing = [], radius = [], shadows = [], motion = [];
  let formCount=0, inputCount=0, tableCount=0, codeBlockCount=0;
  let authMarkerCount=0, pricingSectionCount=0, articleCount=0;
  let productCount=0, checkoutCount=0, buttonCount=0;
  let linkCount=0, cardCount=0, navCount=0;

  const authRx    = /log\s*in|sign\s*in|sign\s*up|register|create\s*account/i;
  const pricingRx = /pricing|subscription|plans/i;
  const productRx = /add\s*to\s*cart|buy\s*now|checkout|product/i;

  for (const el of sampled) {
    const s   = window.getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    const cls = typeof el.className === 'string' ? el.className : '';
    const txt = (el.textContent || '').slice(0, 120);

    typography.push({ fontSize:s.fontSize, fontFamily:s.fontFamily, fontWeight:s.fontWeight, lineHeight:s.lineHeight });
    colors.push({ textColor:s.color, backgroundColor:s.backgroundColor, borderColor:s.borderTopColor||s.borderColor, outlineColor:s.outlineColor });
    spacing.push({ marginTop:s.marginTop, marginRight:s.marginRight, marginBottom:s.marginBottom, marginLeft:s.marginLeft,
                   paddingTop:s.paddingTop, paddingRight:s.paddingRight, paddingBottom:s.paddingBottom, paddingLeft:s.paddingLeft });

    if (s.borderRadius && s.borderRadius !== '0px') radius.push(s.borderRadius);
    if (s.boxShadow && s.boxShadow !== 'none') shadows.push(s.boxShadow);
    if ((s.transitionDuration && s.transitionDuration !== '0s') || (s.animationDuration && s.animationDuration !== '0s')) {
      motion.push({ transitionDuration:s.transitionDuration, animationDuration:s.animationDuration,
                    transitionTimingFunction:s.transitionTimingFunction, animationTimingFunction:s.animationTimingFunction });
    }

    if (tag==='form') formCount++;
    if (['input','select','textarea'].includes(tag)||el.getAttribute('role')==='textbox') inputCount++;
    if (tag==='table'||el.getAttribute('role')==='grid') tableCount++;
    if (tag==='pre'||tag==='code'||cls.includes('code')||cls.includes('highlight')) codeBlockCount++;
    if (tag==='button'||cls.includes('btn')||cls.includes('button')) buttonCount++;
    if (tag==='article'||cls.includes('post')||cls.includes('article')||cls.includes('blog')) articleCount++;
    if (tag==='a') linkCount++;
    if (cls.includes('card')||cls.includes('Card')) cardCount++;
    if (tag==='nav'||el.getAttribute('role')==='navigation') navCount++;
    if (authRx.test(txt)||authRx.test(cls)) authMarkerCount++;
    if (pricingRx.test(txt)||pricingRx.test(cls)) pricingSectionCount++;
    if (productRx.test(txt)||cls.includes('product')||cls.includes('price')) productCount++;
    if (cls.includes('checkout')||cls.includes('cart')||cls.includes('basket')) checkoutCount++;
  }

  const getMeta = (a,v) => document.querySelector(`meta[${a}="${v}"]`)?.getAttribute('content')||'';

  return {
    source: { url: window.location.href, title: document.title },
    sampledAt: new Date().toISOString(),
    sampledElements: sampled.length,
    totalElements,
    typography, colors, spacing, radius, shadows, motion,
    components: [
      {type:'Button',count:buttonCount},{type:'Form',count:formCount},
      {type:'Input',count:inputCount},{type:'Table',count:tableCount},
      {type:'Code Block',count:codeBlockCount},{type:'Article',count:articleCount}
    ],
    // extra density signals for the modal
    densitySignals: { cards:cardCount, buttons:buttonCount, links:linkCount, inputs:inputCount, navigation:navCount },
    siteSignals: {
      elementCounts: { codeBlocks:codeBlockCount, forms:formCount, inputs:inputCount,
        tables:tableCount, authMarkers:authMarkerCount, pricingSections:pricingSectionCount,
        articles:articleCount, productMarkers:productCount, checkoutMarkers:checkoutCount },
      title: document.title,
      description: getMeta('name','description'), keywords: getMeta('name','keywords'),
      ogType: getMeta('property','og:type'), ogSiteName: getMeta('property','og:site_name'),
      appName: getMeta('name','application-name'),
      pathname: window.location.pathname,
      headings: Array.from(document.querySelectorAll('h1,h2,h3')).map(h=>h.textContent.trim()).filter(Boolean).slice(0,20),
      navTexts: Array.from(document.querySelectorAll('nav a,header a,[role="navigation"] a')).map(a=>a.textContent.trim()).filter(Boolean).slice(0,30),
      ctaTexts: Array.from(document.querySelectorAll('button,.btn,.button')).map(b=>b.textContent.trim()).filter(Boolean).slice(0,20),
      textSample: (document.body.innerText||'').slice(0,3000)
    }
  };
}
// ─────────────────────────────────────────────────────────────────────────────

function getDomain(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'page'; }
}

// ZIP download → OS save dialog
async function downloadZipAs(siteName, designMd, skillMd) {
  const zip    = new window.JSZip();          // eslint-disable-line no-undef
  const folder = zip.folder(siteName);
  folder.file('DESIGN.md', designMd);
  folder.file('SKILL.md',  skillMd);
  const blob = await zip.generateAsync({ type:'blob', compression:'DEFLATE' });
  const url  = URL.createObjectURL(blob);
  // filename: sitename_design.zip
  chrome.downloads.download({ url, filename:`${siteName}_design.zip`, saveAs:true },
    () => URL.revokeObjectURL(url));
}

// ─── Persistent state across runs ────────────────────────────────────────────
let lastNormalized   = null;
let lastPayload      = null;
let lastValidation   = null;
let currentSiteName  = 'site';

// ─── DOM Ready ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn    = document.getElementById('analyze-btn');
  const infoBtnEl     = document.getElementById('info-btn');
  const pageUrlEl     = document.getElementById('page-url');
  const designCode    = document.getElementById('design-code');
  const skillCode     = document.getElementById('skill-code');
  const howModal      = document.getElementById('how-modal');
  const modalClose    = document.getElementById('modal-close');

  // Modal stat spans
  const statExtraction = document.getElementById('stat-extraction');
  const statTokens     = document.getElementById('stat-tokens');
  const statProfiling  = document.getElementById('stat-profiling');
  const statChecks     = document.getElementById('stat-checks');
  const statDensity    = document.getElementById('stat-density');

  const originalSubtext = 'Auto-generates from the active tab based on <span class="inline-link">DESIGN.md</span> specifications.';

  // ── Tabs ──────────────────────────────────────────────────────────────────
  document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.dataset.tab).classList.add('active');
    });
  });

  // ── Copy ──────────────────────────────────────────────────────────────────
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id   = document.querySelector('.tab-link.active').dataset.tab;
      const text = document.querySelector(`#${id} textarea`).value;
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        btn.style.cssText += ';border-color:#10b981;color:#10b981';
        setTimeout(() => { btn.innerHTML = orig; btn.style.cssText = ''; }, 1400);
      });
    });
  });

  // ── Download single file ──────────────────────────────────────────────────
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id       = document.querySelector('.tab-link.active').dataset.tab;
      const text     = document.querySelector(`#${id} textarea`).value;
      if (!text) return;
      const filename = `${currentSiteName}_${id === 'design-tab' ? 'DESIGN' : 'SKILL'}.md`;
      const url = URL.createObjectURL(new Blob([text], { type:'text/plain' }));
      chrome.downloads.download({ url, filename, saveAs:true }, () => URL.revokeObjectURL(url));
    });
  });

  // ── Quick-install ZIP buttons ─────────────────────────────────────────────
  document.querySelectorAll('.install-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const design = designCode.value;
      const skill  = skillCode.value;
      if (!design || !skill) { alert('Extract a page first before downloading!'); return; }
      try { await downloadZipAs(currentSiteName, design, skill); }
      catch (err) { console.error(err); alert(`ZIP download failed: ${err.message}`); }
    });
  });

  // ── ? Info modal button ───────────────────────────────────────────────────
  infoBtnEl.addEventListener('click', () => {
    if (!lastNormalized) { alert('Run extraction first!'); return; }
    // Populate dynamic stats
    populateModal();
    howModal.classList.remove('hidden');
  });

  modalClose.addEventListener('click', () => howModal.classList.add('hidden'));
  howModal.addEventListener('click', e => { if (e.target === howModal) howModal.classList.add('hidden'); });

  function populateModal() {
    if (!lastNormalized || !lastPayload) return;
    const n = lastNormalized;

    // Step 1 — extraction
    statExtraction.textContent =
      `Current run: ${lastPayload.sampledElements} sampled elements from ${lastPayload.totalElements} total nodes.`;

    // Step 2 — token coverage
    statTokens.textContent =
      `Current token coverage: typography ${n.typographyScale.length}, color ${n.colorPalette.length}, ` +
      `spacing ${n.spacingScale.length}, radius ${n.radiusTokens.length}, ` +
      `shadow ${n.shadowTokens.length}, motion ${n.motionDurationTokens.length}.`;

    // Step 3 — profiling
    const profile = n.siteProfile || {};
    const evidence = profile.evidence?.join('; ') || 'no strong signals detected';
    statProfiling.textContent =
      `Audience "${profile.audience || '—'}" and surface "${profile.productSurface || '—'}" ` +
      `inferred with ${profile.confidence || '—'} confidence. Evidence: ${evidence}.`;

    // Step 5 — conformance (run validation against design md)
    if (lastValidation) {
      const passed = lastValidation.checks.filter(c=>c.ok).length;
      const total  = lastValidation.checks.length;
      statChecks.textContent = `Current run passed ${passed}/${total} checks.`;
    }

    // Density signals
    const d = lastPayload.densitySignals || {};
    statDensity.textContent =
      `cards: ${d.cards ?? '—'}, buttons: ${d.buttons ?? '—'}, links: ${d.links ?? '—'}, ` +
      `inputs: ${d.inputs ?? '—'}, navigation: ${d.navigation ?? '—'}.`;
  }

  // ── Core extraction ───────────────────────────────────────────────────────
  async function runAnalysis() {
    const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
    if (!tab?.id) { if (pageUrlEl) pageUrlEl.textContent = 'Cannot access tab.'; return; }
    if (/^(chrome|edge|about):\/\//i.test(tab.url)) {
      if (pageUrlEl) pageUrlEl.textContent = 'Cannot inspect internal browser pages.';
      return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('spinning');
    if (pageUrlEl) pageUrlEl.textContent = 'Extracting styles…';

    try {
      const [{ result: payload }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractPageStyles
      });
      if (!payload) throw new Error('Extraction returned empty payload.');

      lastPayload      = payload;
      const normalized = normalizeExtractedStyles(payload);
      lastNormalized   = normalized;

      const domain  = getDomain(tab.url);
      const brand   = domain.split('.')[0];
      currentSiteName = brand;

      const context = {
        normalized,
        metadata: {
          brand: brand.toUpperCase(),
          scope: brand,
          systemName: brand.charAt(0).toUpperCase() + brand.slice(1) + ' Design System'
        }
      };

      const designMd = generateDesignMarkdown(context);
      const skillMd  = generateSkillMarkdown(context);

      designCode.value = designMd;
      skillCode.value  = skillMd;

      // Run validation and cache it
      lastValidation = validateMarkdownOutput('design', designMd);

      if (pageUrlEl) pageUrlEl.innerHTML = originalSubtext;

    } catch (err) {
      console.error(err);
      if (pageUrlEl) pageUrlEl.innerHTML =
        `<span style="color:var(--m-red)">⚠ ${err.message}</span>`;
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.classList.remove('spinning');
    }
  }

  analyzeBtn.addEventListener('click', runAnalysis);
  setTimeout(runAnalysis, 150);
});
