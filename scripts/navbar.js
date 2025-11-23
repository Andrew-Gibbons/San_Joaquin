  // Close menu when a normal link is clicked (but not submenu toggles)
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (!link.classList.contains('submenu-toggle')) {
        document.getElementById('checkbox-toggle').checked = false;
      }
    });
  });

  // Toggle dropdowns when submenu toggles are clicked
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default link behavior
      const dropdown = toggle.nextElementSibling;

      // Close other open dropdowns if you want only one open at a time
      document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove('open');
        }
      });

      // Toggle the clicked one
      dropdown.classList.toggle('open');
    });
  });