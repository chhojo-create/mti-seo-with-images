// Mina Textile Industries — shared site behavior
// Handles: scroll-reveal (.fade-up), animated stat counters ([data-target]),
// and the mobile hamburger nav toggle. Referenced by index/about/products/contact.

document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll-reveal for .fade-up elements ---
  var revealTargets = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: just show everything if IO isn't supported
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- Animated stat counters ([data-target]) ---
  var counters = document.querySelectorAll('[data-target]');
  var animateCounter = function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
  }

  // --- Mobile hamburger nav toggle ---
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.navbar__nav');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu when a link is tapped (mobile UX)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

});
