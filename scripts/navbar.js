// Accessible, unified dropdown logic for mobile and desktop

(function () {
  const checkbox = document.getElementById('checkbox-toggle');
  const menu = document.querySelector('.menu');
  const toggles = Array.from(document.querySelectorAll('.submenu-toggle'));

  // Helper: close all dropdowns
  function closeAllDropdowns(exceptId = null) {
    document.querySelectorAll('.dropdown.open').forEach(dd => {
      if (!exceptId || dd.id !== exceptId) {
        dd.classList.remove('open');
      }
    });
    toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
  }

  // Toggle handler (click or keyboard)
  function toggleDropdown(e, toggleEl) {
    e.preventDefault();
    const targetId = toggleEl.getAttribute('aria-controls');
    const dropdown = document.getElementById(targetId);
    const isOpen = dropdown.classList.contains('open');

    // Close others, then toggle this one
    closeAllDropdowns(targetId);
    dropdown.classList.toggle('open', !isOpen);
    toggleEl.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  }

  // Wire up events for each submenu toggle
  toggles.forEach(toggleEl => {
    // Click/tap
    toggleEl.addEventListener('click', e => toggleDropdown(e, toggleEl));

    // Keyboard: Space/Enter
    toggleEl.addEventListener('keydown', e => {
      const key = e.key;
      if (key === ' ' || key === 'Enter') {
        toggleDropdown(e, toggleEl);
      }
      // Escape closes current
      if (key === 'Escape') {
        const targetId = toggleEl.getAttribute('aria-controls');
        const dropdown = document.getElementById(targetId);
        dropdown.classList.remove('open');
        toggleEl.setAttribute('aria-expanded', 'false');
        toggleEl.focus();
      }
    });
  });

  // Close menu when a normal link is clicked (not submenu toggles)
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      // Close mobile menu
      if (checkbox) checkbox.checked = false;
      // Close all dropdowns
      closeAllDropdowns();
    });
  });

  // Click outside closes dropdowns (desktop & mobile)
  document.addEventListener('click', e => {
    const withinNavbar = e.target.closest('.navbar');
    if (!withinNavbar) {
      closeAllDropdowns();
      if (checkbox) checkbox.checked = false;
    }
  });

  // Manage dropdowns based on viewport changes:
  // On desktop, keep dropdowns closed by default until toggled.
  // On mobile, behavior stays the same (toggle per tap).
  function handleResize() {
    const isDesktop = window.matchMedia('(min-width: 893px)').matches;
    if (isDesktop) {
      // Ensure menu is visible (CSS handles layout); close any open dropdowns
      closeAllDropdowns();
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();
})();
