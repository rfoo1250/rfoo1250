@echo off
rem One-shot setup: installs frontend + backend deps, creates backend\.env, compiles Sass.
setlocal
cd /d "%~dp0"
where npm >nul 2>nul || (echo npm not found: install Node.js first & exit /b 1)

echo == frontend deps (sass) ==
cd frontend
call npm install || exit /b 1
cd ..

echo == backend deps ==
cd backend
call npm install || exit /b 1
cd ..
if not exist backend\.env (
    copy backend\.env.example backend\.env >nul
    echo Created backend\.env from .env.example - fill in RESEND_API_KEY, CONTACT_TO_EMAIL, ALLOWED_ORIGIN
)

echo == compile sass ==
call compile-sass.bat || exit /b 1

echo.
echo Done. To run:
echo   frontend: python -m http.server 8080    (then open http://localhost:8080)
echo   backend:  cd backend ^&^& npm run dev
echo   recompile sass after editing scss: compile-sass.bat
