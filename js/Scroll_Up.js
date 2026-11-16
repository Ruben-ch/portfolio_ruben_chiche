// Bouton "retour en haut" : n'apparaît qu'après avoir défilé
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

(function () {
  function init() {
    var mybutton = document.getElementById('myBtn');
    if (!mybutton) return;
    mybutton.setAttribute('aria-label', 'Retour en haut de la page');
    var update = function () {
      mybutton.classList.toggle('is-visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
  // Le script est inclus avant le bouton dans le HTML : on attend que le DOM soit prêt
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
