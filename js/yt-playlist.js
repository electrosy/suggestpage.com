/* Click-to-load YouTube playlist — works when Firefox ETP blanks iframes */
(function () {
  function mount(btn) {
    var figure = btn.closest('[data-yt-playlist]');
    if (!figure) return;
    var list = figure.getAttribute('data-yt-playlist');
    var frame = figure.querySelector('.yt-embed__frame');
    if (!list || !frame) return;
    var title = (figure.querySelector('.yt-embed__cap') || {}).textContent || 'Suggest Page playlist';
    var src = 'https://www.youtube-nocookie.com/embed/videoseries?list=' + encodeURIComponent(list) + '&autoplay=1&playsinline=1&rel=0';
    frame.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title.trim();
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    frame.appendChild(iframe);
    figure.setAttribute('data-yt-loaded', '1');
  }
  function boot() {
    document.querySelectorAll('[data-yt-playlist] .yt-embed__facade').forEach(function (btn) {
      btn.addEventListener('click', function () { mount(btn); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
