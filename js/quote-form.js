(function () {
  "use strict";

  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  var STORAGE_KEY = "qm_utm";

  function captureUtm() {
    var params = new URLSearchParams(window.location.search);
    var found = {};
    var hasAny = false;

    UTM_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) {
        found[key] = value;
        hasAny = true;
      }
    });

    if (hasAny) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      } catch (e) {
        /* storage unavailable, fall through to session-only capture */
      }
      return found;
    }

    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      /* ignore */
    }
    return {};
  }

  function getUtmSource(utm) {
    if (utm.utm_source) return utm.utm_source;
    if (utm.utm_medium || utm.utm_campaign) {
      return [utm.utm_medium, utm.utm_campaign].filter(Boolean).join("/");
    }
    return "";
  }

  function setStatus(form, message, isError) {
    var status = form.querySelector(".form-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "form-status";
      form.appendChild(status);
    }
    status.textContent = message;
    status.style.color = isError ? "#b3261e" : "#1f7a3f";
  }

  function handleSubmit(form, utm) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitButton = form.querySelector('button[type="submit"]');
      var formData = new FormData(form);

      var payload = {
        name: formData.get("name"),
        company: formData.get("company"),
        phone: formData.get("phone"),
        email: formData.get("email") || "",
        zip: formData.get("zip") || "",
        service: formData.get("service") || "",
        sqft: formData.get("sqft") || "",
        notes: formData.get("notes") || "",
        utm_source: getUtmSource(utm),
      };

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = "Sending...";
      }
      setStatus(form, "", false);

      fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok && data.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            form.reset();
            setStatus(form, "Thanks — we received your request and will call you back within one business day.", false);
          } else {
            setStatus(form, "Something went wrong sending your request. Please call (866) 958-8773 instead.", true);
          }
        })
        .catch(function () {
          setStatus(form, "Something went wrong sending your request. Please call (866) 958-8773 instead.", true);
        })
        .finally(function () {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalText || "Get My Free Quote";
          }
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var utm = captureUtm();
    var forms = document.querySelectorAll(".quote-form form");
    forms.forEach(function (form) {
      handleSubmit(form, utm);
    });
  });
})();
