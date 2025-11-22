document.querySelectorAll('.submenu > a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // stop "#" navigation

    const dropdown = this.nextElementSibling;

    // Close other dropdowns
    document.querySelectorAll('.dropdown').forEach(menu => {
      if (menu !== dropdown) {
        menu.style.display = 'none';
      }
    });

    // Toggle the clicked dropdown
    dropdown.style.display =
      dropdown.style.display === 'block' ? 'none' : 'block';
  });
});