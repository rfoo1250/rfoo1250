# Backend
It uses Render (free tier). Express contact-form API (`backend/server.js`) that sends mail via Resend (HTTP API, not SMTP — Render's free tier blocks outbound SMTP ports).

1. `cd backend && npm install`
2. Copy `.env.example` to `.env` and fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `ALLOWED_ORIGIN` (all required, server exits if missing). Get the API key from resend.com; sign up with the same address as `CONTACT_TO_EMAIL` since the unverified `onboarding@resend.dev` sender can only send to your own account email.
3. `npm run dev` (auto-restart) or `npm start` — runs on `PORT` (default 3000)
4. Test endpoints: `GET /ping`, `POST /contact` (or run `node test-mail.js` to send a real test email via Resend)
5. On Render: set `RESEND_API_KEY` (and the other env vars) in the dashboard's Environment tab, then redeploy.

# Sass
Sass will need to compile, first
1. Have Sass installed, by local, choco/apt/brew, or npm
If npm, I use `nodevenv` to have it contained.
2. `sass sass/main.scss css/style.css`
Remember to change scss files and not css files

# Python local dev server
to test:
```cmd
python -m http.server 8080
```

to kill:
```cmd
# on Windows
taskkill /F /IM python.exe
```

# Port forward to Internet using ngrok
1. ngrok config add-authtoken <your_auth_token>
2. ngrok http 8080
make sure you use the same port (port forwarding, duh)
then you can see on desktop or mobile