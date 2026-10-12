(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".site-footer .legal a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });

  document.querySelectorAll("[data-open-products]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const drop = document.querySelector(".nav-drop");
      const button = drop && drop.querySelector(".nav-drop-btn");
      if (!drop || !button) return;
      drop.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      if (!link.closest(".site-footer")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll(".nav-drop-btn").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const drop = button.closest(".nav-drop");
      const open = drop.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.querySelectorAll(".cta-card video").forEach(function (video) {
    const card = video.closest(".cta-card");
    if (!card) return;
    video.muted = true;
    function playVideo() {
      const play = video.play();
      if (play) play.catch(function () {});
    }
    function resetVideo() {
      video.pause();
      video.currentTime = 0;
    }
    card.addEventListener("mouseenter", playVideo);
    card.addEventListener("pointerenter", playVideo);
    card.addEventListener("mouseleave", resetVideo);
    card.addEventListener("pointerleave", resetVideo);
  });

  document.addEventListener("click", function (event) {
    document.querySelectorAll(".nav-drop.is-open").forEach(function (drop) {
      if (!drop.contains(event.target)) {
        drop.classList.remove("is-open");
        const button = drop.querySelector(".nav-drop-btn");
        if (button) button.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
