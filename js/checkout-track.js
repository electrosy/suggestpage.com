/*! checkout-track.js — GA4 begin_checkout on Stripe Payment Link clicks.
 *  Binds any a[href^="https://buy.stripe.com/"]. Same-tab clicks wait for
 *  gtag (beacon + event_callback) or an 800ms fallback, then navigate.
 *  Modifier-clicks and middle-clicks keep the browser default and only beacon.
 */
(function () {
  'use strict';

  var TIMEOUT_MS = 800;
  var SELECTOR = 'a[href^="https://buy.stripe.com/"]';
  var PLANS = {
    cNicN4bIFbAv2TydTl1Fe01: { id: 'page-pack', name: 'Page Pack' },
    fZu3cu6ol5c72TydTl1Fe00: { id: 'site-care', name: 'Site Care' }
  };

  var pendingSameTab = false;
  var lastHref = '';
  var lastAt = 0;

  function paymentLinkId(href) {
    var match = String(href || '').match(/buy\.stripe\.com\/([^/?#]+)/i);
    return match ? match[1] : '';
  }

  function planFor(href) {
    return PLANS[paymentLinkId(href)] || { id: 'checkout', name: 'Checkout' };
  }

  function linkFrom(node) {
    while (node && node !== document) {
      if (node.nodeType === 1 && node.matches && node.matches(SELECTOR)) return node;
      node = node.parentNode;
    }
    return null;
  }

  function opensAwayFromThisTab(event, link) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return true;
    if (typeof event.button === 'number' && event.button !== 0) return true;
    var target = (link.getAttribute('target') || '').toLowerCase();
    return !!(target && target !== '_self');
  }

  function duplicate(href) {
    var now = Date.now();
    if (href === lastHref && now - lastAt < 50) return true;
    lastHref = href;
    lastAt = now;
    return false;
  }

  function send(plan, onSent) {
    if (typeof window.gtag !== 'function') return false;
    var params = {
      currency: 'USD',
      value: 39,
      plan: plan.name,
      items: [{
        item_id: plan.id,
        item_name: plan.name,
        price: 39,
        quantity: 1
      }],
      transport_type: 'beacon'
    };
    if (onSent) {
      params.event_callback = onSent;
      params.event_timeout = TIMEOUT_MS;
    }
    try {
      window.gtag('event', 'begin_checkout', params);
      return true;
    } catch (err) {
      return false;
    }
  }

  function onActivate(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;

    var link = linkFrom(event.target);
    if (!link || event.defaultPrevented) return;

    var href = link.href;
    var plan = planFor(href);
    var away = opensAwayFromThisTab(event, link);

    if (away) {
      if (duplicate(href)) return;
      send(plan);
      return;
    }

    if (pendingSameTab) {
      event.preventDefault();
      return;
    }
    if (duplicate(href)) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    pendingSameTab = true;

    var done = false;
    function go() {
      if (done) return;
      done = true;
      pendingSameTab = false;
      window.location.href = href;
    }

    var timer = window.setTimeout(go, TIMEOUT_MS);
    var sent = send(plan, function () {
      window.clearTimeout(timer);
      go();
    });
    if (!sent) {
      window.clearTimeout(timer);
      go();
    }
  }

  document.addEventListener('click', onActivate, false);
  document.addEventListener('auxclick', onActivate, false);
})();
