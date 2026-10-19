# WEN Corp website

Static marketing site for WEN Corporation's dissolved gas flotation units, deployed on Vercel.

## Layout

- `index.html` - the site (single page, self-contained; images and logo are embedded)
- `WEN_Corp_Flotation_Unit_Teaser.pdf` - one-page refinery teaser, served at `/WEN_Corp_Flotation_Unit_Teaser.pdf`
- `api/inquiry.js` - serverless function that emails contact form submissions
- `vercel.json` - security headers

## Deploy

1. Import this repository in Vercel (Add New > Project). No build step; framework preset "Other"; leave build command and output directory empty (the site is served from the repository root).
2. Contact form email (Resend):
   1. Create an account at resend.com and add the domain `wencorp.com` (Domains > Add Domain, region US).
   2. Add the DNS records Resend shows to the wencorp.com zone at GoDaddy. They are TXT and MX records on subdomains (`resend._domainkey` and `send`), so they do not affect the existing GoDaddy mailboxes. Click Verify in Resend.
   3. Create an API key (API Keys > Create, "Sending access").
   4. In Vercel, Project > Settings > Environment Variables, add for Production:
      - `RESEND_API_KEY` = the key
      - `INQUIRY_FROM` = `WEN Corp Website <inquiries@wencorp.com>`
      - `INQUIRY_TO` = `james.seefried@wencorp.com`
   5. Redeploy (Deployments > latest > Redeploy) so the function picks up the variables, then submit the form once to test.
3. Add `wencorp.com` under Project > Domains and update DNS at GoDaddy as Vercel instructs.

Until `RESEND_API_KEY` is set, the form shows a message asking visitors to email directly.
