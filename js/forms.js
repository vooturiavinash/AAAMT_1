(function () {
  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    const note = form.querySelector("[data-form-note]");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const required = Array.from(form.querySelectorAll("[required]"));
      const missing = required.filter(function (field) {
        if (field.type === "checkbox") return !field.checked;
        return !String(field.value || "").trim();
      });
      required.forEach(function (field) { field.removeAttribute("aria-invalid"); });
      if (missing.length) {
        missing.forEach(function (field) { field.setAttribute("aria-invalid", "true"); });
        missing[0].focus();
        if (note) note.textContent = "Complete the required fields before sending.";
        return;
      }
      form.reset();
      if (note) note.textContent = "Enquiry recorded in this browser. No server is connected in this local build.";
    });
  });
})();
