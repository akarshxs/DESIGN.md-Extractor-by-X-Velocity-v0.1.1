(() => {
  const elements = Array.from(document.querySelectorAll('body *'));
  const totalElements = elements.length;
  // Sample up to 1000 elements to avoid performance lag while maintaining representation
  const sampledElements = elements.slice(0, 1000);

  const typography = [];
  const colors = [];
  const spacing = [];
  const radius = [];
  const shadows = [];
  const motion = [];
  const componentCounts = {};

  // For component detection
  let formCount = 0;
  let inputCount = 0;
  let tableCount = 0;
  let codeBlockCount = 0;
  let authMarkerCount = 0;
  let pricingSectionCount = 0;
  let articleCount = 0;
  let productCount = 0;
  let checkoutCount = 0;
  let buttonCount = 0;

  const authRegex = /log\s*in|sign\s*in|sign\s*up|log\s*out|register|create\s*account/i;
  const pricingRegex = /pricing|subscription|plans/i;
  const productRegex = /add\s*to\s*cart|buy\s*now|checkout|product|price/i;

  sampledElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const tagName = el.tagName.toLowerCase();
    const textContent = el.textContent || '';
    const className = el.className || '';

    // 1. Typography
    typography.push({
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight
    });

    // 2. Colors
    colors.push({
      textColor: style.color,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderTopColor || style.borderColor,
      outlineColor: style.outlineColor
    });

    // 3. Spacing
    spacing.push({
      marginTop: style.marginTop,
      marginRight: style.marginRight,
      marginBottom: style.marginBottom,
      marginLeft: style.marginLeft,
      paddingTop: style.paddingTop,
      paddingRight: style.paddingRight,
      paddingBottom: style.paddingBottom,
      paddingLeft: style.paddingLeft
    });

    // 4. Radius
    if (style.borderRadius && style.borderRadius !== '0px') {
      radius.push(style.borderRadius);
    }

    // 5. Shadows
    if (style.boxShadow && style.boxShadow !== 'none') {
      shadows.push(style.boxShadow);
    }

    // 6. Motion
    if ((style.transitionDuration && style.transitionDuration !== '0s') || 
        (style.animationDuration && style.animationDuration !== '0s')) {
      motion.push({
        transitionDuration: style.transitionDuration,
        animationDuration: style.animationDuration,
        transitionTimingFunction: style.transitionTimingFunction,
        animationTimingFunction: style.animationTimingFunction
      });
    }

    // 7. Component detection counts
    if (tagName === 'form') formCount++;
    if (['input', 'select', 'textarea'].includes(tagName) || el.getAttribute('role') === 'textbox') inputCount++;
    if (tagName === 'table' || el.getAttribute('role') === 'grid') tableCount++;
    if (tagName === 'pre' || tagName === 'code' || className.includes('code') || className.includes('highlight')) codeBlockCount++;
    if (tagName === 'button' || className.includes('btn') || className.includes('button')) buttonCount++;
    if (tagName === 'article' || className.includes('post') || className.includes('article') || className.includes('blog')) articleCount++;

    if (authRegex.test(textContent.slice(0, 50)) || authRegex.test(className)) authMarkerCount++;
    if (pricingRegex.test(textContent.slice(0, 100)) || pricingRegex.test(className)) pricingSectionCount++;
    if (productRegex.test(textContent.slice(0, 100)) || className.includes('product') || className.includes('price')) productCount++;
    if (className.includes('checkout') || className.includes('cart') || className.includes('basket')) checkoutCount++;
  });

  const components = [
    { type: 'Button', count: buttonCount },
    { type: 'Form', count: formCount },
    { type: 'Input', count: inputCount },
    { type: 'Table', count: tableCount },
    { type: 'Code Block', count: codeBlockCount },
    { type: 'Article', count: articleCount }
  ];

  // Headings
  const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim()).filter(Boolean);
  // Nav text
  const navTexts = Array.from(document.querySelectorAll('nav a, header a, footer a, [role="navigation"] a')).map(a => a.textContent.trim()).filter(Boolean).slice(0, 50);
  // CTA texts
  const ctaTexts = Array.from(document.querySelectorAll('button, .btn, .button, a.cta')).map(b => b.textContent.trim()).filter(Boolean).slice(0, 30);

  // Meta signals
  const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
  const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute('content') || '';
  const ogSiteName = document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || '';
  const appName = document.querySelector('meta[name="application-name"]')?.getAttribute('content') || '';
  const bodyText = document.body.innerText || '';

  const siteSignals = {
    elementCounts: {
      codeBlocks: codeBlockCount,
      forms: formCount,
      inputs: inputCount,
      tables: tableCount,
      authMarkers: authMarkerCount,
      pricingSections: pricingSectionCount,
      articles: articleCount,
      productMarkers: productCount,
      checkoutMarkers: checkoutCount
    },
    title: document.title,
    description: metaDesc,
    keywords: metaKeywords,
    ogType,
    ogSiteName,
    appName,
    pathname: window.location.pathname,
    headings,
    navTexts,
    ctaTexts,
    textSample: bodyText.slice(0, 3000)
  };

  return {
    source: {
      url: window.location.href,
      title: document.title
    },
    sampledAt: new Date().toISOString(),
    sampledElements: sampledElements.length,
    totalElements,
    typography,
    colors,
    spacing,
    radius,
    shadows,
    motion,
    components,
    siteSignals
  };
})();
