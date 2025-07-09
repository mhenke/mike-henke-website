// Animate skill bars on DOMContentLoaded
window.addEventListener('DOMContentLoaded', function () {
  document
    .querySelectorAll('.skills-card .progress-bar span[data-percent]')
    .forEach(function (bar) {
      // Use setTimeout to ensure layout is calculated before animating
      setTimeout(function () {
        bar.style.width = bar.getAttribute('data-percent') + '%';
      }, 100);
    });
});
