/* Suggest Page — sync sp-lang from legal page URLs / switcher */
(function () {
  'use strict';

  var STORAGE_KEY = 'sp-lang';
  var PATH_RE = /^\/(?:(es|ro|he|tr)\/)?(terms|privacy|aup|refunds|cookies|copyright|legal)\/?/i;

  function setLang(code) {
    if (!code) return;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
  }

  function langFromPath(pathname) {
    var m = String(pathname || '').match(PATH_RE);
    if (!m) return null;
    return m[1] ? m[1].toLowerCase() : 'en';
  }

  var fromPath = langFromPath(location.pathname);
  if (fromPath) setLang(fromPath);

  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('.lang-switch a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/^(mailto:|tel:|https?:|\/\/)/i.test(href)) return;
    var path = href.split('#')[0].split('?')[0];
    var lang = langFromPath(path);
    if (lang) setLang(lang);
  }, true);
})();
