// Change le titre de l'onglet quand l'utilisateur quitte la page (sans dépendance jQuery,
// ce script est aussi chargé sur des pages qui n'incluent pas jQuery)
(function () {
  var pageTitle = document.title;
  window.addEventListener('blur', function () {
    document.title = 'Reviens vite 🏃';
  });
  window.addEventListener('focus', function () {
    document.title = pageTitle;
  });
})();
