// THE RULES — the subreddit-style rail + AutoMod gate.
// Rule config lives here so Barrie can edit copy without touching logic.
// Enforced rule: #1 "Lurk before you post" — primary CTAs unlock after the
// visitor has actually engaged (scroll depth OR a real beat on the page).
// The mailto escape hatch is NEVER gated.
(function () {
  var RULES = [
    { n: 1, title: "Lurk before you post.", text: "Read the room before you ask for anything.", enforced: true },
    { n: 2, title: "No cold pitches.", text: "If it reads like a cold email, it dies in the queue." },
    { n: 3, title: "Contribute before you extract.", text: "Add something before you take something." },
    { n: 4, title: "No astroturf.", text: "We'll know. We always know." },
    { n: 5, title: "Be a real one.", text: "Bots, spam, and “Dear Sir/Madam” get removed on sight." },
    { n: 6, title: "Respect the room.", text: "Every community has norms. So does this one." },
    { n: 7, title: "Rule 7 is a secret.", text: "" },
  ];

  var REMOVAL_MESSAGES = [
    "You've been here about six seconds. Read the room, then try again.",
    "Still lurking? Scroll a little. The room can tell.",
    "Okay, you're persistent. We respect that. But the room respects lurkers. Almost there.",
  ];

  var UNLOCK_SCROLL = 0.45; // unlock after ~45% scroll depth
  var UNLOCK_TIME = 25000; // …or 25s of genuine presence
  var lurked = false;
  var rejections = 0;
  var startedAt = Date.now();

  // --- Render the rail ---
  var rail = document.getElementById("rules-rail");
  if (rail) {
    var list = rail.querySelector(".rules-rail__list");
    RULES.forEach(function (r) {
      var li = document.createElement("li");
      if (r.enforced) li.setAttribute("data-enforced", "true");
      var strong = document.createElement("strong");
      strong.textContent = r.title;
      li.appendChild(strong);
      if (r.text) li.appendChild(document.createTextNode(r.text + " "));
      list.appendChild(li);
    });

    var chip = rail.querySelector(".rules-rail__chip");
    chip.addEventListener("click", function () {
      var open = rail.classList.toggle("is-open");
      chip.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Desktop: open by default on wide screens
    if (window.matchMedia("(min-width: 1400px)").matches) {
      rail.classList.add("is-open");
      rail.querySelector(".rules-rail__chip").setAttribute("aria-expanded", "true");
    }
  }

  // --- The lurk detector (keyboard scrolling counts too — it's just scroll) ---
  function checkLurk() {
    if (lurked) return;
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - window.innerHeight;
    var depth = scrollable > 0 ? window.scrollY / scrollable : 1;
    if (depth >= UNLOCK_SCROLL || Date.now() - startedAt >= UNLOCK_TIME) {
      unlock();
    }
  }

  function unlock() {
    lurked = true;
    var status = document.querySelector(".rules-rail__status");
    if (status) status.textContent = "✓ ready. you lurked. we noticed.";
    document.querySelectorAll("[data-cta=primary]").forEach(function (el) {
      el.removeAttribute("data-locked");
    });
    var form = document.querySelector("form[data-ks-form]");
    if (form) form.dataset.blocked = "false";
  }

  window.addEventListener("scroll", checkLurk, { passive: true });
  var lurkTimer = setInterval(function () {
    checkLurk();
    if (lurked) clearInterval(lurkTimer);
  }, 1000);

  // Short pages (e.g. 404) may not be scrollable at all — check once on load.
  checkLurk();

  // --- The AutoMod toast ---
  var toast = document.getElementById("automod-toast");
  var toastTimer;
  function showToast(html) {
    if (!toast) return;
    toast.innerHTML = html;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 6000);
  }

  function removalToast() {
    var msg = REMOVAL_MESSAGES[Math.min(rejections, REMOVAL_MESSAGES.length - 1)];
    rejections++;
    showToast(
      "<strong>⚠ Removed by AutoMod</strong>" +
        "<p><em>Rule 1: Lurk before you post.</em> " + msg + "</p>"
    );
  }

  function approvalToast() {
    showToast(
      "<strong>✓ Approved by the community.</strong>" +
        "<p>Nice. Now we can talk.</p>"
    );
  }

  // --- Gate the primary CTAs (never the mailto) ---
  var approvedOnce = false;
  document.querySelectorAll("[data-cta=primary]").forEach(function (el) {
    el.setAttribute("data-locked", "true");
    el.addEventListener("click", function (e) {
      if (!lurked) {
        e.preventDefault();
        removalToast();
      } else if (!approvedOnce && el.tagName === "A") {
        approvedOnce = true;
        approvalToast();
      }
    });
  });

  // --- Gate the contact form submit the same way ---
  var form = document.querySelector("form[data-ks-form]");
  if (form) {
    form.dataset.blocked = lurked ? "false" : "true";
    form.addEventListener(
      "submit",
      function (e) {
        if (!lurked) {
          e.preventDefault();
          e.stopImmediatePropagation();
          removalToast();
        }
      },
      true
    );
  }
})();
