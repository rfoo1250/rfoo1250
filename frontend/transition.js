(function () {
  var SWITCH_KEY = 'page-switching';
  var DURATION = 650;

  var overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  overlay.innerHTML = '<span class="page-transition-overlay__text">Switching...</span>';

  var isArriving = sessionStorage.getItem(SWITCH_KEY) === '1';
  if (isArriving) {
    sessionStorage.removeItem(SWITCH_KEY);
    overlay.classList.add('page-transition-overlay--visible', 'page-transition-overlay--no-transition');
  }

  document.body.appendChild(overlay);
  document.documentElement.classList.remove('is-switching');

  if (isArriving) {
    void overlay.offsetWidth; // force reflow so no-transition state registers before enabling it
    overlay.classList.remove('page-transition-overlay--no-transition');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('page-transition-overlay--departing');
      });
    });
  }

  var toggle = document.querySelector('.header__version-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    var href = toggle.getAttribute('href');
    var dest = href.indexOf('version=pro') !== -1 ? 'index-pro.html' : 'index.html';

    sessionStorage.setItem(SWITCH_KEY, '1');

    // Snap overlay back above the viewport with no animation, then slide it down
    overlay.classList.remove('page-transition-overlay--visible', 'page-transition-overlay--departing');
    overlay.classList.add('page-transition-overlay--no-transition');
    void overlay.offsetWidth; // force reflow so snap commits before transition re-enables
    overlay.classList.remove('page-transition-overlay--no-transition');
    overlay.classList.add('page-transition-overlay--visible');

    var navigated = false;
    function goToPage() {
      if (navigated) return;
      navigated = true;
      window.location.href = dest;
    }
    overlay.addEventListener('transitionend', goToPage, { once: true });
    setTimeout(goToPage, DURATION + 100);
  });
}());
