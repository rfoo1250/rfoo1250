# Quick start
Needs Node.js (npm) and Python 3. From the repo root:
```sh
./setup.sh    # Mac / Linux / Git Bash
setup.bat     # Windows cmd
```
This installs frontend and backend deps, creates `backend/.env` from `.env.example` (fill it in), and compiles Sass. Then:
```sh
python3 -m http.server 8080      # frontend, from repo root (python on Windows), open http://localhost:8080
cd backend && npm run dev        # backend, auto-restarts; npm start for plain
```

# Backend
It uses Render (free tier). Express contact-form API (`backend/server.js`) that sends mail via Resend (HTTP API, not SMTP — Render's free tier blocks outbound SMTP ports).

1. `backend/.env` needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `ALLOWED_ORIGIN` (all required, server exits if missing). Get the API key from resend.com; sign up with the same address as `CONTACT_TO_EMAIL` since the unverified `onboarding@resend.dev` sender can only send to your own account email.
2. Runs on `PORT` (default 3000). Test endpoints: `GET /ping`, `POST /contact`
3. On Render: set `RESEND_API_KEY` (and the other env vars) in the dashboard's Environment tab, then redeploy.

# Sass
Edit the `.scss` files, never `css/style.css`, then recompile from the repo root:
```sh
./compile-sass.sh    # Mac / Linux / Git Bash
compile-sass.bat     # Windows cmd
```
Both look for `sass` in `frontend/node_modules` (from setup), a `nodevenv/` in the repo root (gitignored), or on PATH (`brew install sass/sass/sass`, `choco install sass`, `npm i -g sass`).
Watch mode, from `frontend/`: `npm run compile:scss`

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
