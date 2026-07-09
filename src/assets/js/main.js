// Kind Stranger — tiny site JS: nav toggle, form confirmation. No frameworks.
(function () {
  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Contact form: human confirmation state (Formspree AJAX)
  var form = document.querySelector("form[data-ks-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.dataset.blocked === "true") return; // rules.js said no
      var confirmBox = document.querySelector(".form__confirm");
      var btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (!res.ok) throw new Error("send failed");
          form.style.display = "none";
          if (confirmBox) {
            confirmBox.style.display = "block";
            confirmBox.textContent =
              "✓ Got it. A real human will reply — probably Barrie, usually within a day.";
          }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = "Send"; }
          if (confirmBox) {
            confirmBox.style.display = "block";
            confirmBox.textContent =
              "✕ That didn't send. Email us the old-fashioned way: hello@kindstrangerhq.com";
          }
        });
    });
  }
})();
