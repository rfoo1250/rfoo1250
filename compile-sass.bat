@echo off
setlocal
cd /d "%~dp0"

rem Find a local sass: frontend\node_modules (installed by setup.bat), then nodevenv, else PATH
if exist frontend\node_modules\.bin set "PATH=%~dp0frontend\node_modules\.bin;%PATH%"
if exist nodevenv\Scripts set "PATH=%~dp0nodevenv\Scripts;%PATH%"
where sass >nul 2>nul || (echo sass not found: run setup.bat first, or install sass globally & exit /b 1)

cd frontend
call sass sass\main.scss css\style.css || exit /b 1
echo Sass compiled -^> frontend\css\style.css
