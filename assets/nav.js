// "Not work" slides the nav row left to reveal My music and My taste; the back button, Escape,
// or a pick from the row slides it home. Without this script "Not work" is a plain link.
(function () {
  var bar = document.querySelector('.site-nav-links');
  var open = bar && bar.querySelector('.nav-open');
  var sub = bar && bar.querySelector('.nav-sub');
  var main = bar && bar.querySelector('.nav-main');
  if (!open || !sub || !main) return;
  var back = sub.querySelector('.nav-back');

  function set(on, focus) {
    bar.classList.toggle('sub-open', on);
    open.setAttribute('aria-expanded', on ? 'true' : 'false');
    sub.inert = !on;
    main.inert = on;
    if (focus) (on ? back : open).focus({ preventScroll: true });
  }

  open.addEventListener('click', function (e) { e.preventDefault(); set(true, e.detail === 0); });
  back.addEventListener('click', function (e) { set(false, e.detail === 0); });
  sub.addEventListener('click', function (e) { if (e.target.closest('a')) set(false, false); });
  // Escape slides home; it takes focus back to "Not work" only when focus was already in the nav.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || e.defaultPrevented || !bar.classList.contains('sub-open')) return;
    set(false, bar.contains(document.activeElement));
  });
})();
