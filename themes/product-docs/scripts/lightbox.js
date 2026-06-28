(function () {
  function initCarousels() {
    Array.prototype.slice.call(document.querySelectorAll("[data-report-carousel]")).forEach(function (carousel) {
      var slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-report-slide]"));
      var dots = Array.prototype.slice.call(carousel.querySelectorAll("[data-report-dot]"));
      var prev = carousel.querySelector("[data-report-prev]");
      var next = carousel.querySelector("[data-report-next]");
      var index = Math.max(0, slides.findIndex(function (slide) { return slide.classList.contains("is-active"); }));
      function render(nextIndex) {
        if (!slides.length) return;
        index = (nextIndex + slides.length) % slides.length;
        slides.forEach(function (slide, slideIndex) {
          slide.classList.toggle("is-active", slideIndex === index);
        });
        dots.forEach(function (dot, dotIndex) {
          dot.classList.toggle("is-active", dotIndex === index);
          dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
        });
      }
      if (prev) prev.addEventListener("click", function () { render(index - 1); });
      if (next) next.addEventListener("click", function () { render(index + 1); });
      dots.forEach(function (dot, dotIndex) {
        dot.addEventListener("click", function () { render(dotIndex); });
      });
      render(index);
    });
  }

  initCarousels();

  var images = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox], .prose img, .report-carousel img"));
  if (!images.length) return;

  var activeTrigger = null;
  var previousOverflow = "";
  var overlay = document.createElement("div");
  var closeButton = document.createElement("button");
  var preview = document.createElement("img");

  overlay.className = "image-lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-hidden", "true");

  closeButton.className = "image-lightbox-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close image preview");
  closeButton.textContent = "×";

  preview.className = "image-lightbox-preview";
  preview.alt = "";
  overlay.appendChild(closeButton);
  overlay.appendChild(preview);
  document.body.appendChild(overlay);

  function closeLightbox() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    preview.removeAttribute("src");
    document.body.style.overflow = previousOverflow;
    if (activeTrigger && typeof activeTrigger.focus === "function") activeTrigger.focus();
    activeTrigger = null;
  }

  function openLightbox(image) {
    activeTrigger = image;
    previousOverflow = document.body.style.overflow;
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt || "";
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  images.forEach(function (image) {
    if (image.closest("a")) return;
    image.classList.add("js-lightbox-image");
    image.setAttribute("role", "button");
    image.setAttribute("tabindex", "0");
    image.setAttribute("aria-label", image.alt ? "Open image preview: " + image.alt : "Open image preview");
    image.addEventListener("click", function () { openLightbox(image); });
    image.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openLightbox(image);
    });
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay || event.target === closeButton || event.target === preview) closeLightbox();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) closeLightbox();
  });
})();
