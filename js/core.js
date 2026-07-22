window.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".navbar-toggle");
  const navLinks = document.querySelector(".navbar-links");
  const navOverlay = document.querySelector(".nav-overlay");

  if (navToggle && navLinks) {
    let scrollPosition = 0;
    let lastFocusedElement = null;
    let releaseTrap = null;

    function openMobileMenu() {
      scrollPosition = window.pageYOffset;
      navLinks.classList.add("active");
      navToggle.classList.add("active");
      navToggle.setAttribute("aria-expanded", "true");
      if (navOverlay) navOverlay.classList.add("active");
      document.body.classList.add("nav-open");
    }

    function closeMobileMenu() {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      if (navOverlay) navOverlay.classList.remove("active");
      document.body.classList.remove("nav-open");
      if (releaseTrap) {
        releaseTrap();
        releaseTrap = null;
      }
      if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
        scrollPosition = 0;
      }
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    }

    navToggle.addEventListener("click", function () {
      var isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      if (!isExpanded) openMobileMenu();
      else closeMobileMenu();
    });

    var navLinkItems = navLinks.querySelectorAll("a:not(.dropdown-toggle)");
    navLinkItems.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 1024) closeMobileMenu();
      });
    });

    if (navOverlay) {
      navOverlay.addEventListener("click", closeMobileMenu);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) closeMobileMenu();
    });

    var navClose = document.querySelector(".navbar-close");
    if (navClose) {
      navClose.addEventListener("click", closeMobileMenu);
    }

    var dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    dropdownToggles.forEach(function (toggle) {
      var dropdown = toggle.closest(".nav-dropdown");
      var menu = dropdown.querySelector(".dropdown-menu");
      if (!menu) return;

      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        var isExpanded = toggle.getAttribute("aria-expanded") === "true";
        dropdownToggles.forEach(function (other) {
          if (other !== toggle) {
            other.setAttribute("aria-expanded", "false");
            var m = other
              .closest(".nav-dropdown")
              .querySelector(".dropdown-menu");
            if (m) m.classList.remove("show");
          }
        });
        if (isExpanded) {
          toggle.setAttribute("aria-expanded", "false");
          menu.classList.remove("show");
        } else {
          toggle.setAttribute("aria-expanded", "true");
          menu.classList.add("show");
        }
      });

      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
          toggle.setAttribute("aria-expanded", "false");
          menu.classList.remove("show");
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("show")) {
          toggle.setAttribute("aria-expanded", "false");
          menu.classList.remove("show");
          toggle.focus();
        }
      });

      if (navToggle) {
        navToggle.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          menu.classList.remove("show");
        });
      }

      var dropdownLinks = menu.querySelectorAll("a");
      dropdownLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          if (window.innerWidth < 1024) {
            closeMobileMenu();
          }
        });
      });
    });
  }

  var progressBars = document.querySelectorAll(".progress-bar[data-width]");
  if (progressBars.length > 0) {
    function animateBar(bar) {
      var targetWidth = bar.getAttribute("data-width");
      var delay = bar.getAttribute("data-animation-delay") || "0s";
      var span = bar.querySelector("span");
      if (span && targetWidth) {
        span.style.setProperty("--animation-delay", delay);
        bar.classList.add("animate");
        requestAnimationFrame(function () {
          span.style.width = targetWidth + "%";
        });
      }
    }
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (
              entry.isIntersecting &&
              !entry.target.classList.contains("animate")
            ) {
              animateBar(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
      );
      progressBars.forEach(function (bar) {
        obs.observe(bar);
      });
    } else {
      progressBars.forEach(animateBar);
    }
  }

  var timeline = document.querySelector(".timeline");
  if (timeline) {
    function animateTimeline() {
      timeline.classList.add("animate");
    }
    if ("IntersectionObserver" in window) {
      var tobs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (
              entry.isIntersecting &&
              !entry.target.classList.contains("animate")
            ) {
              animateTimeline();
              tobs.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
      );
      tobs.observe(timeline);
    } else {
      animateTimeline();
    }
  }
});

window.copyCode = function (button) {
  var codeBlock = button.closest(".code-block");
  if (!codeBlock) return;
  var code = codeBlock.querySelector("code");
  if (!code) return;
  var text = code.textContent;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(function () {
      showCopySuccess(button);
    });
  } else {
    fallbackCopy(text, button);
  }
};

function fallbackCopy(text, button) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-999999px";
  ta.style.top = "-999999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    showCopySuccess(button);
  } catch (e) {
    /* ignore */ void e;
  }
  document.body.removeChild(ta);
}

function showCopySuccess(button) {
  var original = button.innerHTML;
  button.innerHTML = '<i class="ph ph-check"></i>';
  button.classList.add("copy-success");
  setTimeout(function () {
    button.innerHTML = original;
    button.classList.remove("copy-success");
  }, 2000);
}

(function () {
  var backToTopButton = document.getElementById("back-to-top");
  if (!backToTopButton) return;

  function toggle() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
      backToTopButton.setAttribute("aria-hidden", "false");
      backToTopButton.setAttribute("tabindex", "0");
    } else {
      backToTopButton.classList.remove("visible");
      backToTopButton.setAttribute("aria-hidden", "true");
      backToTopButton.setAttribute("tabindex", "-1");
    }
  }
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
