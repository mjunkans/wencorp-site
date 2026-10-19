# WEN Corp website

Static marketing site for WEN Corporation's dissolved gas flotation units, deployed on Vercel.

## Layout

- `public/index.html` - the site (single page, self-contained; images and logo are embedded)
- `public/WEN_Corp_Flotation_Unit_Teaser.pdf` - one-page refinery teaser, served at `/WEN_Corp_Flotation_Unit_Teaser.pdf`
- `api/inquiry.js` - serverless function that emails contact form submissions
- `vercel.json` - security headers

## Deploy

1. Import this repository in Vercel (Add New > Project). No build step; framework preset "Other". Output directory: `public`.
2. Set environment variables in the Vercel project:
   - `RESEND_API_KEY` - API key from resend.com
   - `INQUIRY_FROM` - a sender on a domain verified in Resend, e.g. `WEN Corp Website <inquiries@wencorp.com>`
   - `INQUIRY_TO` - optional; defaults to James.seefried@wencorp.com
3. Add `wencorp.com` under Project > Domains and update DNS at GoDaddy as Vercel instructs.

Until `RESEND_API_KEY` is set, the form shows a message asking visitors to email directly.
