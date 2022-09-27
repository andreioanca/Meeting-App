document.getElementById('toggle').addEventListener('change', function () {
  this.setAttribute('aria-checked', this.checked);
});
