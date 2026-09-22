/* Playlist player: Firefox-friendly open-on-YouTube + optional in-page embed */
(function () {
  function isFirefox() {
    return typeof InstallTrigger !== 'undefined' || /firefox/i.test(navigator.userAgent || '');
  }
  function openExternal(figure) {
    var url = figure.getAttribute('data-yt-url');
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }
  function mountEmbed(figure) {
    var list = figure.getAttribute('data-yt-playlist');
    var frame = figure.querySelector('.yt-embed__frame');
    if (!list || !frame) return;
    var title = ((figure.querySelector('.yt-embed__cap') || {}).textContent || 'Suggest Page playlist').trim();
    // Prefer youtube.com (some ETP profiles treat nocookie worse)
    var src = 'https://www.youtube.com/embed/videoseries?list=' + encodeURIComponent(list) + '&autoplay=1&playsinline=1&rel=0';
    frame.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.loading = 'lazy';
    iframe.src = src;
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.setAttribute('allowfullscreen', '');
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.appendChild(iframe);
    figure.setAttribute('data-yt-loaded', '1');
  }
  function boot() {
    document.querySelectorAll('[data-yt-playlist]').forEach(function (figure) {
      var facade = figure.querySelector('.yt-embed__facade');
      var tryBtn = figure.querySelector('[data-yt-try-embed]');
      if (facade) {
        facade.addEventListener('click', function () {
          // Firefox: open YouTube (embeds often blank under Tracking Protection)
          if (isFirefox()) {
            openExternal(figure);
            return;
          }
          mountEmbed(figure);
        });
      }
      if (tryBtn) {
        tryBtn.addEventListener('click', function (e) {
          e.preventDefault();
          mountEmbed(figure);
        });
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
