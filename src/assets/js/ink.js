// Invisible ink: the word sits under a layer of shimmering dust that the
// visitor rubs away (mouse or finger), in the spirit of Apple's invite ink.
// The real text is always in the DOM (screen readers and search engines see
// it); reduced-motion users see it plainly with no effect at all.
(function () {
  var span = document.querySelector(".ink");
  if (!span) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var PAD_X = 10, PAD_Y = 8;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var mask = document.createElement("canvas");
  var mctx = mask.getContext("2d");
  canvas.setAttribute("aria-hidden", "true");
  span.appendChild(canvas);

  var W, H, particles, bgColor, raf, done = false, rubbed = 0;

  function setup() {
    var r = span.getBoundingClientRect();
    W = Math.ceil(r.width) + PAD_X * 2;
    H = Math.ceil(r.height) + PAD_Y * 2;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    mask.width = canvas.width;
    mask.height = canvas.height;
    mctx.globalCompositeOperation = "source-over";
    mctx.fillStyle = "#fff";
    mctx.fillRect(0, 0, mask.width, mask.height);
    bgColor = getComputedStyle(document.body).backgroundColor;

    particles = [];
    var count = Math.floor((W * H) / 16);
    for (var i = 0; i < count; i++) {
      var roll = Math.random();
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.4,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 2.2 + 0.6,
        c: roll < 0.14 ? "136,6,206" : roll < 0.55 ? "50,50,50" : "130,130,130",
      });
    }
  }

  var t = 0;
  function draw() {
    t += 0.045;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var q = particles[i];
      var a = 0.3 + 0.7 * Math.abs(Math.sin(q.p + t * q.s));
      ctx.fillStyle = "rgba(" + q.c + "," + a.toFixed(2) + ")";
      ctx.beginPath();
      ctx.arc(q.x, q.y, q.r, 0, 6.283);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "destination-in";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(mask, 0, 0);
    raf = requestAnimationFrame(draw);
  }

  function rub(e) {
    if (done) return;
    var r = canvas.getBoundingClientRect();
    var x = (e.clientX - r.left) * DPR;
    var y = (e.clientY - r.top) * DPR;
    var rad = 30 * DPR;
    var g = mctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(0.6, "rgba(0,0,0,0.85)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    mctx.globalCompositeOperation = "destination-out";
    mctx.fillStyle = g;
    mctx.beginPath();
    mctx.arc(x, y, rad, 0, 6.283);
    mctx.fill();
    rubbed++;
    if (rubbed > 55) dissolve();
  }

  function dissolve() {
    if (done) return;
    done = true;
    canvas.style.transition = "opacity 1.4s ease";
    canvas.style.opacity = "0";
    setTimeout(function () {
      cancelAnimationFrame(raf);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }, 1500);
  }

  canvas.addEventListener("pointermove", rub);
  canvas.addEventListener("pointerdown", rub);

  // Nobody should leave without the headline: dissolve on its own eventually,
  // and immediately for keyboard-only visitors.
  setTimeout(dissolve, 14000);
  window.addEventListener("keydown", function onKey() {
    dissolve();
    window.removeEventListener("keydown", onKey);
  });

  var rt;
  window.addEventListener("resize", function () {
    if (done) return;
    clearTimeout(rt);
    rt = setTimeout(setup, 150);
  });

  setup();
  draw();
})();
