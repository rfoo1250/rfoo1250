(function () {
  var version = document.documentElement.getAttribute('data-version') || 'normal';
  var param = new URLSearchParams(window.location.search).get('version');
  if (!param || param === version) return;
  window.location.replace(param === 'pro' ? 'index-pro.html' : 'index.html');
}());
