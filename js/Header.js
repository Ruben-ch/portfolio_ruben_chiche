// Navigation latérale (desktop) / menu burger (mobile)
(function () {
  const navigation = document.querySelector('.navigation');
  if (!navigation) return;

  const menuToggle = navigation.querySelector('.menu-toggle');
  const list = navigation.querySelector('.list');
  const listItems = navigation.querySelectorAll('.list-item');
  const mobileQuery = window.matchMedia('(max-width: 768px)');

  // Accessibilité : le bouton burger est une <div>, on lui donne un rôle de bouton
  if (list && !list.id) list.id = 'main-menu';
  if (menuToggle) {
    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    if (list) menuToggle.setAttribute('aria-controls', list.id);
  }

  const isOpen = () => navigation.classList.contains('open');

  function setOpen(open) {
    navigation.classList.toggle('open', open);
    // Bloque le scroll de la page derrière le menu plein écran (mobile uniquement, cf. Header.css)
    document.body.classList.toggle('nav-open', open);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!isOpen());
    });
    menuToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!isOpen());
      }
    });
  }

  // Clic sur un lien : élément actif + fermeture du menu
  listItems.forEach(function (item) {
    item.addEventListener('click', function () {
      listItems.forEach(function (i) { i.classList.remove('active'); });
      item.classList.add('active');
      setOpen(false);
    });
  });

  // Fermeture au clic à l'extérieur du menu
  document.addEventListener('click', function (e) {
    if (isOpen() && !navigation.contains(e.target)) setOpen(false);
  });

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      if (menuToggle) menuToggle.focus();
    }
  });

  // Réinitialise l'état quand on passe d'une mise en page à l'autre (rotation, redimensionnement)
  const onChange = function () { setOpen(false); };
  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onChange);
  else if (mobileQuery.addListener) mobileQuery.addListener(onChange);
})();
