
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