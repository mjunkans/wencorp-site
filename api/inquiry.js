// Vercel serverless function: receives the website inquiry form and emails it.
// Requires env vars: RESEND_API_KEY, INQUIRY_TO (defaults to James), INQUIRY_FROM (a verified sender on your Resend domain).
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const b = req.body || {};
  const clean = (v) => String(v || "").trim().slice(0, 4000);
  const name = clean(b.name), company = clean(b.company), email = clean(b.email);
  if (!name || !company || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: "Missing required fields" });
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ error: "Email not configured" });
  const to = process.env.INQUIRY_TO || "James.seefried@wencorp.com";
  const from = process.env.INQUIRY_FROM || "WEN Corp Website <inquiries@wencorp.com>";
  const lines = [
    `Name: ${name}`, `Company: ${company}`, `Email: ${email}`, `Phone: ${clean(b.phone)}`,
    `Facility type: ${clean(b.facility)}`, `Flow rate (BPD): ${clean(b.flow)}`, `Commercial option: ${clean(b.option)}`,
    "", "Project details:", clean(b.message),
  ];
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Website inquiry: ${company} (${clean(b.option) || "quotation"})`, text: lines.join("\n") }),
  });
  if (!r.ok) return res.status(502).json({ error: "Email provider error" });
  return res.status(200).json({ ok: true });
}
