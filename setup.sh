#!/usr/bin/env bash
# One-shot setup: installs frontend + backend deps, creates backend/.env, compiles Sass.
set -e
cd "$(dirname "$0")"
command -v npm >/dev/null || { echo "npm not found: install Node.js first"; exit 1; }

echo "== frontend deps (sass) =="
(cd frontend && npm install)

echo "== backend deps =="
(cd backend && npm install)
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env from .env.example - fill in RESEND_API_KEY, CONTACT_TO_EMAIL, ALLOWED_ORIGIN"
fi

echo "== compile sass =="
./compile-sass.sh

echo ""
echo "Done. To run:"
echo "  frontend: python3 -m http.server 8080    (then open http://localhost:8080)"
echo "  backend:  cd backend && npm run dev"
echo "  recompile sass after editing scss: ./compile-sass.sh"
