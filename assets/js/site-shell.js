(function () {
  const script = document.currentScript;
  const root = script?.dataset.siteRoot || './';
  const headerMode = document.body.dataset.headerMode || 'standard';

  const href = (path) => `${root}${path}`;

  const navItems = [
    { label: 'About', href: href('#about'), color: 'triad-red' },
    { label: 'Service', href: href('#service'), color: 'triad-purple' },
    { label: 'News', href: href('#news'), color: 'triad-pink' },
    { label: 'Contact', href: href('#contact'), color: 'triad-lime' },
  ];

  const headerClass = [
    headerMode === 'cinematic' ? 'site-header' : '',
    'fixed top-0 left-0 w-full z-40 transition-all',
    headerMode === 'cinematic' ? 'duration-700' : 'duration-500',
    'py-6 bg-creamy-bg/80 backdrop-blur-xl border-b border-transparent',
  ].filter(Boolean).join(' ');

  const navLinks = navItems.map((item) => (
    `<a href="${item.href}" class="hover:text-${item.color} transition-all hover:-translate-y-0.5 transform inline-block">${item.label}</a>`
  )).join('');

  const mobileLinks = navItems.map((item) => (
    `<a href="${item.href}" class="hover:text-${item.color} mobile-link transition-colors duration-300">${item.label}</a>`
  )).join('');

  const footerLinks = navItems.map((item) => (
    `<a href="${item.href}" class="hover:text-gray-900 transition-colors">${item.label}</a>`
  )).join('');

  const headerTarget = document.querySelector('[data-site-header]');
  if (headerTarget) {
    headerTarget.outerHTML = `
    <!-- Minimal Header -->
    <header id="header" class="${headerClass}">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div class="text-xl font-black tracking-tight text-gray-900">
          <a href="${href('')}">Genesis<span class="text-triad-red">.</span></a>
        </div>

        <nav class="hidden md:flex gap-10 text-xs font-bold tracking-widest uppercase">
          ${navLinks}
        </nav>

        <a href="${href('contact/')}" class="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-triad-purple border border-gray-100">
          Contact Us
        </a>

        <button id="menu-btn" class="md:hidden text-gray-900 p-2" aria-label="Open navigation" aria-controls="mobile-menu" aria-expanded="false">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </header>

    <!-- Mobile Nav Menu -->
    <div id="mobile-menu" class="fixed inset-0 bg-creamy-bg/95 backdrop-blur-3xl z-50 hidden flex-col items-center justify-center gap-8 text-2xl font-black tracking-widest uppercase opacity-0 transition-opacity duration-300">
      <button id="close-btn" class="absolute top-8 right-8 text-gray-900 border border-gray-200 rounded-full p-2 hover:bg-white" aria-label="Close navigation">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      ${mobileLinks}
      <a href="${href('contact/')}" class="text-xs text-gray-500 font-bold border border-gray-200 rounded-full px-6 py-3 mt-8 hover:bg-gray-100 mobile-link">Contact Us</a>
    </div>`;
  }

  const footerTarget = document.querySelector('[data-site-footer]');
  if (footerTarget) {
    footerTarget.outerHTML = `
    <footer class="border-t border-gray-100 py-10 px-6 lg:px-12">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div class="flex flex-col gap-2">
          <div class="text-gray-900 font-black text-2xl tracking-tight"><a href="${href('')}">Genesis<span class="text-triad-red">.</span></a></div>
          <p class="text-xs text-gray-400 font-medium">&copy; 2026 Genesis合同会社.</p>
        </div>

        <nav class="flex flex-wrap gap-x-8 gap-y-2 uppercase tracking-widest text-xs font-bold text-gray-400">
          ${footerLinks}
        </nav>

        <div class="flex gap-4 text-gray-400">
          <a href="https://x.com/genesis_sns?s=21&t=AH_LBc3ctTNIjEuSUVRRSA" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors" aria-label="X (Twitter)"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://www.instagram.com/genesis_llc_?igsh=YW9mcXJld3ZrOW90&utm_source=qr" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors" aria-label="Instagram"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
        </div>
      </div>
    </footer>`;
  }

  const btn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  const openMenu = () => {
    if (!menu || !btn) return;
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    window.setTimeout(() => {
      menu.classList.remove('opacity-0');
      menu.classList.add('opacity-100');
    }, 10);
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    if (!menu || !btn) return;
    menu.classList.remove('opacity-100');
    menu.classList.add('opacity-0');
    window.setTimeout(() => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
      document.body.style.overflow = '';
    }, 300);
    btn.setAttribute('aria-expanded', 'false');
  };

  btn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  links.forEach((link) => link.addEventListener('click', closeMenu));

  if (headerMode !== 'cinematic') {
    const header = document.getElementById('header');
    const updateHeaderChrome = () => {
      if (!header) return;
      if (window.scrollY > 20) {
        header.classList.add('border-gray-200', 'shadow-sm', 'bg-creamy-bg/95');
        header.classList.remove('border-transparent', 'bg-creamy-bg/80');
      } else {
        header.classList.remove('border-gray-200', 'shadow-sm', 'bg-creamy-bg/95');
        header.classList.add('border-transparent', 'bg-creamy-bg/80');
      }
    };

    window.addEventListener('scroll', updateHeaderChrome);
    updateHeaderChrome();
  }
}());
