/* static/js/lightbox.js — robust, delegated, guarded lightbox */
(function () {
  try {
    if (window.LIGHTBOX_INITIALISED) {
      console.log('Lightbox: already initialised');
      return;
    }
    window.LIGHTBOX_INITIALISED = true;
    console.log('Lightbox: initialising…');

    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.innerHTML = `
      <div class="lb-window" role="dialog" aria-modal="true" aria-label="Image viewer">
        <button class="lb-close" aria-label="Close">✕</button>
        <button class="lb-prev" aria-label="Previous">◀</button>
        <button class="lb-next" aria-label="Next">▶</button>
        <img class="lb-img" alt="" />
        <div class="lb-caption" aria-live="polite"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('.lb-img');
    const lbCaption = overlay.querySelector('.lb-caption');
    const btnClose = overlay.querySelector('.lb-close');
    const btnPrev = overlay.querySelector('.lb-prev');
    const btnNext = overlay.querySelector('.lb-next');

    let currentGroup = [];
    let currentIndex = 0;
    let lastFocused = null;

    function openLightbox(group, index) {
      currentGroup = group;
      currentIndex = index;
      const item = currentGroup[currentIndex];
      if (!item) return;
      lbImg.src = item.href;
      lbImg.alt = item.dataset.caption || '';
      lbCaption.textContent = item.dataset.caption || '';
      overlay.classList.add('open');
      lastFocused = document.activeElement;
      btnClose.focus();
      document.addEventListener('keydown', onKeyDown);
    }

    function closeLightbox() {
      overlay.classList.remove('open');
      lbImg.src = '';
      currentGroup = [];
      document.removeEventListener('keydown', onKeyDown);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function showPrev() {
      if (!currentGroup.length) return;
      currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
      const item = currentGroup[currentIndex];
      lbImg.src = item.href;
      lbCaption.textContent = item.dataset.caption || '';
    }

    function showNext() {
      if (!currentGroup.length) return;
      currentIndex = (currentIndex + 1) % currentGroup.length;
      const item = currentGroup[currentIndex];
      lbImg.src = item.href;
      lbCaption.textContent = item.dataset.caption || '';
    }

    function onKeyDown(e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') return closeLightbox();
      if (e.key === 'ArrowLeft') return showPrev();
      if (e.key === 'ArrowRight') return showNext();
      // small focus trap
      if (e.key === 'Tab') {
        const focusables = [btnClose, btnPrev, btnNext];
        const idx = focusables.indexOf(document.activeElement);
        if (e.shiftKey) {
          const next = (idx <= 0) ? focusables.length - 1 : idx - 1;
          focusables[next].focus();
          e.preventDefault();
        } else {
          const next = (idx === -1 || idx === focusables.length - 1) ? 0 : idx + 1;
          focusables[next].focus();
          e.preventDefault();
        }
      }
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
    btnClose.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', showPrev);
    btnNext.addEventListener('click', showNext);

    document.addEventListener('click', function (ev) {
      const a = ev.target.closest && ev.target.closest('a[data-lightbox]');
      if (!a) return;
      if (ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.altKey || ev.shiftKey) return;

      const groupName = a.getAttribute('data-lightbox') || 'default';
      const all = Array.from(document.querySelectorAll('a[data-lightbox=\"' + CSS.escape(groupName) + '\"]'));
      const index = all.indexOf(a);
      if (index === -1) return;
      ev.preventDefault();
      openLightbox(all, index);
    }, { passive: false });

    window._lightbox = {
      open: function (groupName = 'default', index = 0) {
        const all = Array.from(document.querySelectorAll('a[data-lightbox=\"' + groupName + '\"]'));
        openLightbox(all, index);
      }
    };

    console.log('Lightbox: ready (delegated).');
  } catch (err) {
    console.error('Lightbox FATAL ERROR:', err && (err.stack || err));
    try { delete window.LIGHTBOX_INITIALISED; } catch(e){}
  }
})();
