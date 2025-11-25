// Accessible, polished navbar logic
(function () {
  const checkbox = document.getElementById('checkbox-toggle');
  const toggles = Array.from(document.querySelectorAll('.submenu-toggle'));

  // Helper: close all dropdowns
  function closeAllDropdowns(exceptId = null) {
    document.querySelectorAll('.dropdown').forEach(dd => {
      if (!exceptId || dd.id !== exceptId) {
        dd.classList.remove('open');
        dd.hidden = true; /* NEW */
      }
    });
    toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
  }

  // Toggle handler
  function toggleDropdown(e, toggleEl) {
    e.preventDefault();
    const targetId = toggleEl.getAttribute('aria-controls');
    const dropdown = document.getElementById(targetId);
    const isOpen = dropdown.classList.contains('open');

    closeAllDropdowns(targetId);
    dropdown.classList.toggle('open', !isOpen);
    dropdown.hidden = isOpen; /* NEW */
    toggleEl.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');

    // NEW: focus first link when opening
    if (!isOpen) {
      const firstLink = dropdown.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  }

  // Wire up events
  toggles.forEach(toggleEl => {
    toggleEl.addEventListener('click', e => toggleDropdown(e, toggleEl));
    toggleEl.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') toggleDropdown(e, toggleEl);
      if (e.key === 'Escape') closeAllDropdowns();
    });
  });

  // Close menu when a normal link is clicked
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (checkbox) checkbox.checked = false;
      closeAllDropdowns();
    });
  });

  // Click outside closes dropdowns
  document.addEventListener('click', e => {
    if (!e.target.closest('.navbar')) {
      closeAllDropdowns();
      if (checkbox) checkbox.checked = false;
    }
  });

  // NEW: global Escape closes everything
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      if (checkbox) checkbox.checked = false;
    }
  });

  // Handle resize
  function handleResize() {
    const isDesktop = window.matchMedia('(min-width: 893px)').matches;
    if (isDesktop) closeAllDropdowns();
  }
  window.addEventListener('resize', handleResize);
  handleResize();
})();

