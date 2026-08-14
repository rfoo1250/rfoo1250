# Backend
It uses Render (free tier). Express contact-form API (`backend/server.js`) that sends mail via nodemailer.

1. `cd backend && npm install`
2. Copy `.env.example` to `.env` and fill in `SMTP_*`, `CONTACT_TO_EMAIL`, `ALLOWED_ORIGIN` (all required, server exits if missing)
3. `npm run dev` (auto-restart) or `npm start` — runs on `PORT` (default 3000)
4. Test endpoints: `GET /ping`, `POST /contact` (or run `node test-mail.js` to test SMTP directly)


# Sass
Sass will need to compile, first
1. Have Sass installed, by local, choco/apt/brew, or npm
If npm, I use `nodevenv` to have it contained.
2. `sass sass/main.scss css/style.css`
Remember to change scss files and not css files

# Python local dev server
to kill:
```cmd
# on Windows
taskkill /F /IM python.exe
```

# Port forward to Internet using ngrok
1. ngrok config add-authtoken <your_auth_token>
2. ngrok http 3000
then you can see on desktop or mobile