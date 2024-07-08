document.addEventListener('click', function(event) {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('users-accordion-sub-1');
    const isClickInsideMenu = menu.contains(event.target);
    const isMenuToggle = event.target === menuToggle;
  
    if (isMenuToggle) {
      menu.classList.toggle('hidden');
    } else if (!isClickInsideMenu) {
      menu.classList.add('hidden');
    }
  });
  