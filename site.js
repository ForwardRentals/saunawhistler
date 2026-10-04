// Mobile menu toggle + one-click booking through Rented Local (same flow as mamquamsauna.com)
(function () {
  var EMBED_KEY = 'mamquamsauna-f3160d';

  var toggle = document.querySelector('.hamburger');
  var header = document.querySelector('header.site');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('nav.main a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Book buttons link straight to the booking page; if the widget script has
  // loaded, open its popup instead so visitors stay on this site.
  document.querySelectorAll('a[data-book]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.RentedLocal && typeof window.RentedLocal.open === 'function') {
        e.preventDefault();
        window.RentedLocal.open(EMBED_KEY);
      }
    });
  });
})();
