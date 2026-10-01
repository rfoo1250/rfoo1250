# Backend
It uses Render (free tier). Express contact-form API (`backend/server.js`) that sends mail via Resend (HTTP API, not SMTP — Render's free tier blocks outbound SMTP ports).

1. `cd backend && npm install`
2. Copy `.env.example` to `.env` and fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `ALLOWED_ORIGIN` (all required, server exits if missing). Get the API key from resend.com; sign up with the same address as `CONTACT_TO_EMAIL` since the unverified `onboarding@resend.dev` sender can only send to your own account email.
3. `npm run dev` (auto-restart) or `npm start` — runs on `PORT` (default 3000)
4. Test endpoints: `GET /ping`, `POST /contact`
5. On Render: set `RESEND_API_KEY` (and the other env vars) in the dashboard's Environment tab, then redeploy.

# Sass
Compile Sass first, and edit the `.scss` files, never `css/style.css`.

Get a `sass` binary one of these ways (the setup scripts find all of them):
- `cd frontend && npm install` — uses the version pinned in `frontend/package.json`
- a `nodevenv/` in the repo root (gitignored) with sass installed in it
- global: `brew install sass/sass/sass`, `choco install sass`, or `npm i -g sass`

One-shot compile, from the repo root:
```sh
./setup.sh    # Mac / Linux / Git Bash
setup.bat     # Windows cmd
```
Or by hand, from `frontend/`:
```sh
sass sass/main.scss css/style.css    # one-shot
npm run compile:scss                 # watch mode (needs npm install)
```

# Python local dev server
From the repo root:
```sh
python3 -m http.server 8080    # Mac / Linux
python -m http.server 8080     # Windows
```
Stop it with `Ctrl+C`. If it was left running somewhere else:
```sh
kill $(lsof -ti :8080)         # Mac / Linux
taskkill /F /IM python.exe     # Windows
```

# Port forward to Internet using ngrok
1. 
```cmd
ngrok config add-authtoken <your_auth_token>
```

2. 
```cmd
ngrok http 8080
```

make sure you use the same port (port forwarding, duh)
then you can see on desktop or mobile
