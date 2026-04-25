(function () {
  if (sessionStorage.getItem('page-switching') === '1') {
    document.documentElement.classList.add('is-switching');
  }
}());
