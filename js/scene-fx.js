/**
 * Homepage atmosphere: procedurally generates the rain + ripples,
 * wires the weather toggle (persisted in localStorage), and adds a
 * very light parallax on mouse move for depth. Nothing here touches
 * navigation or island logic — purely decorative.
 */
(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const rainLayer = document.getElementById("rain-drops");
  const rippleLayer = document.getElementById("rain-ripples");
  const toggleBtn = document.getElementById("weather-toggle");
  const clouds = document.querySelector(".clouds");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- build the rain ----------

  function buildRain() {
    if (!rainLayer || rainLayer.childElementCount) return;
    const DROP_COUNT = 70;
    for (let i = 0; i < DROP_COUNT; i++) {
      const x1 = Math.random() * 1600;
      const y1 = -Math.random() * 60 - 10;
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("class", "rain-drop");
      line.setAttribute("x1", x1.toFixed(1));
      line.setAttribute("y1", y1.toFixed(1));
      line.setAttribute("x2", (x1 + 9).toFixed(1));
      line.setAttribute("y2", (y1 + 32).toFixed(1));
      const duration = (0.7 + Math.random() * 0.8).toFixed(2);
      line.style.animationDuration = duration + "s";
      line.style.animationDelay = "-" + (Math.random() * parseFloat(duration) * 6).toFixed(2) + "s";
      rainLayer.appendChild(line);
    }
  }

  function buildRipples() {
    if (!rippleLayer || rippleLayer.childElementCount) return;
    const RIPPLE_COUNT = 16;
    for (let i = 0; i < RIPPLE_COUNT; i++) {
      const cx = 40 + Math.random() * 1520;
      const cy = 500 + Math.random() * 370;
      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("class", "rain-ripple");
      circle.setAttribute("cx", cx.toFixed(1));
      circle.setAttribute("cy", cy.toFixed(1));
      circle.setAttribute("r", "5");
      const duration = (1.3 + Math.random() * 1.1).toFixed(2);
      circle.style.animationDuration = duration + "s";
      circle.style.animationDelay = "-" + (Math.random() * parseFloat(duration)).toFixed(2) + "s";
      rippleLayer.appendChild(circle);
    }
  }

  // ---------- weather toggle (persisted) ----------

  function setWeather(on) {
    document.body.classList.toggle("weather-off", !on);
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", String(on));
      toggleBtn.textContent = on ? "🌧️ Weather: On" : "☀️ Weather: Off";
    }
    localStorage.setItem("weatherOn", on ? "1" : "0");
  }

  function initWeather() {
    buildRain();
    buildRipples();

    const saved = localStorage.getItem("weatherOn");
    const initialOn = saved !== null ? saved === "1" : !prefersReducedMotion;
    setWeather(initialOn);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const isOn = document.body.classList.contains("weather-off");
        setWeather(isOn); // currently off -> turning on, and vice versa
      });
    }
  }

  // ---------- subtle mouse parallax on clouds/sun (desktop only) ----------

  function initParallax() {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip on touch devices

    const scene = document.getElementById("scene");
    if (!scene) return;

    scene.addEventListener("mousemove", (e) => {
      const rect = scene.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5..0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      if (clouds) clouds.style.transform = `translate(${nx * -14}px, ${ny * -6}px)`;
    });
    scene.addEventListener("mouseleave", () => {
      if (clouds) clouds.style.transform = "";
    });
  }

  initWeather();
  initParallax();

})();
