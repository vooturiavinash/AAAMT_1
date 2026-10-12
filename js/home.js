(function () {
  const hero = document.querySelector("[data-hero-rotator]");
  if (hero) {
    const videos = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-video]"));
    const panels = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-panel]"));
    let index = 0;
    let switching = false;

    function show(next) {
      if (!videos.length || switching) return;
      const current = index;
      if (next === current && videos[current].classList.contains("is-active")) {
        const play = videos[current].play();
        if (play) play.catch(function () {});
        return;
      }
      switching = true;
      index = ((next % videos.length) + videos.length) % videos.length;

      videos.forEach(function (video, i) {
        const active = i === index;
        video.classList.toggle("is-active", active);
        if (active) {
          try { video.currentTime = 0; } catch (err) {}
          const play = video.play();
          if (play) play.catch(function () {});
        } else {
          video.pause();
        }
      });

      panels.forEach(function (panel, i) {
        const active = i === index;
        panel.classList.toggle("is-active", active);
        panel.setAttribute("aria-hidden", active ? "false" : "true");
      });

      window.setTimeout(function () {
        switching = false;
      }, 700);
    }

    videos.forEach(function (video, i) {
      video.loop = false;
      video.muted = true;
      video.addEventListener("ended", function () {
        show(i + 1);
      });
    });

    show(0);
  }

  const slides = [
    {
      image: "assets/images/avatar-b.png",
      name: "Prof. Raghav Rao, Academic Coordinator",
      quote: "“Student engagement increased significantly.”",
      body: "Students receive instant updates on exams, assignments, and events. The mobile app made communication easier, and faculty love the simplified evaluation tools."
    },
    {
      image: "assets/images/avatar-a.png",
      name: "Prof. Raghav Rao, Academic Coordinator",
      quote: "“Student engagement increased significantly.”",
      body: "Students receive instant updates on exams, assignments, and events. The mobile app made communication easier, and faculty love the simplified evaluation tools."
    }
  ];

  const root = document.querySelector("[data-testimonials]");
  if (!root) return;

  const photo = root.querySelector("[data-photo]");
  const name = root.querySelector("[data-name]");
  const quote = root.querySelector("[data-quote]");
  const body = root.querySelector("[data-body]");
  let index = 0;

  function render() {
    const slide = slides[index];
    photo.src = slide.image;
    photo.alt = slide.name;
    name.textContent = slide.name;
    quote.textContent = slide.quote;
    body.textContent = slide.body;
  }

  root.querySelector("[data-prev]").addEventListener("click", function () {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });
  root.querySelector("[data-next]").addEventListener("click", function () {
    index = (index + 1) % slides.length;
    render();
  });
  render();
})();
