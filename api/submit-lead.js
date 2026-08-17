const CRM_URL = "https://thequotemasters.com/crm_api/api.php?action=push_lead";
const ZIP_PATTERN = /^\d{5}$/;
const PHONE_DIGITS_MIN = 10;

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function sanitizeText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
    return;
  }

  const token = process.env.CRM_API_TOKEN;
  if (!token) {
    res.statusCode = 500;
    res.end(JSON.stringify({ ok: false, error: "Server misconfigured" }));
    return;
  }

  let body = req.body;
  if (!body || typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      res.statusCode = 400;
      res.end(JSON.stringify({ ok: false, error: "Invalid request body" }));
      return;
    }
  }

  const name = sanitizeText(body.name, 120);
  const company = sanitizeText(body.company, 160);
  const phoneDigits = onlyDigits(body.phone);
  const email = sanitizeText(body.email, 160);
  const zip = sanitizeText(body.zip, 5);
  const service = sanitizeText(body.service, 120);
  const sqft = sanitizeText(body.sqft, 60);
  const notes = sanitizeText(body.notes, 1000);
  const utmSource = sanitizeText(body.utm_source, 255);

  if (!name || !company || phoneDigits.length < PHONE_DIGITS_MIN) {
    res.statusCode = 400;
    res.end(JSON.stringify({ ok: false, error: "Missing required fields" }));
    return;
  }

  const nameParts = name.split(/\s+/);
  const firstName = nameParts.shift() || name;
  const lastName = nameParts.join(" ") || "-";

  const noteParts = [];
  if (service) noteParts.push(`Service: ${service}`);
  if (sqft) noteParts.push(`Sq ft: ${sqft}`);
  if (notes) noteParts.push(notes);

  const payload = {
    zip: ZIP_PATTERN.test(zip) ? zip : "",
    customer: {
      company_name: company,
      first_name: firstName,
      last_name: lastName,
      position: "",
      phone: phoneDigits,
      email: email,
      email2: "",
      address: "",
      service_address: "",
      notes: noteParts.join(" | "),
    },
    number_of_quotes: "1",
    utm_source: utmSource,
  };

  try {
    const crmResponse = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await crmResponse.text();

    if (!crmResponse.ok) {
      res.statusCode = 502;
      res.end(JSON.stringify({ ok: false, error: "CRM rejected the request" }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch {
    res.statusCode = 502;
    res.end(JSON.stringify({ ok: false, error: "Unable to reach CRM" }));
  }
};
