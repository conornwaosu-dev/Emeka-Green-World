/**
 * QR landing tracking: append ?source=qr1 (or any key) to this page URL.
 * Outbound links get utm_* params; form gets hidden "source" for Formspree.
 * Read window.__LANDING_SOURCE__ or window.__LANDING_PARAMS__ from GTM/analytics.
 */
(function () {
  var params = new URLSearchParams(window.location.search);
  var source = params.get("source") || "direct";

  window.__LANDING_SOURCE__ = source;
  window.__LANDING_PARAMS__ = Object.fromEntries(params.entries());

  function withUtm(urlString) {
    try {
      var u = new URL(urlString);
      u.searchParams.set("utm_source", source);
      u.searchParams.set("utm_medium", "qr_landing");
      u.searchParams.set("utm_campaign", "emeka-green");
      return u.toString();
    } catch (e) {
      return urlString;
    }
  }

  var spotify = document.getElementById("spotify-cta");
  if (spotify && spotify.getAttribute("href")) {
    spotify.href = withUtm(spotify.getAttribute("href"));
  }

  document.querySelectorAll("[data-outbound]").forEach(function (el) {
    var base = el.getAttribute("href");
    if (base) el.href = withUtm(base);
  });

  var formSource = document.getElementById("form-source");
  if (formSource) formSource.value = source;

  params.forEach(function (value, key) {
    var hidden = document.querySelector('input[name="landing_' + key + '"]');
    if (hidden) hidden.value = value;
  });
})();
