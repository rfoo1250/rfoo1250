@echo off

rem Activate nodevenv
call nodevenv\Scripts\activate.bat

rem Go to frontend
cd frontend

rem Compile sass
call sass sass\main.scss css\style.css

echo.
echo Sass compiled. To compile again, run:
echo sass sass\main.scss css\style.css
