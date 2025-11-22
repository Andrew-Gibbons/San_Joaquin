// 1. Close hamburger menu when a top-level link is clicked (but not submenu parents)
document.querySelectorAll('.menu > li:not(.submenu) > a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('checkbox-toggle').checked = false;
  });
});

// 2. Toggle dropdown when submenu parent is clicked
document.querySelectorAll('.submenu > a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // stop "#" navigation

    const dropdown = this.nextElementSibling;

    // Close other dropdowns
    document.querySelectorAll('.dropdown').forEach(menu => {
      if (menu !== dropdown) {
        menu.classList.remove('open');
      }
    });

    // Toggle the clicked dropdown
    dropdown.classList.toggle('open');

    // Optional: flip arrow indicator
    this.parentElement.classList.toggle('open');
  });
});