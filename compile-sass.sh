#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

# Find a local sass: nodevenv (bin/ on Unix, Scripts/ on Windows/Git Bash),
# then frontend/node_modules (installed by setup.sh), else PATH
if [ -d "nodevenv/bin" ]; then
    export PATH="$PWD/nodevenv/bin:$PATH"
elif [ -d "nodevenv/Scripts" ]; then
    export PATH="$PWD/nodevenv/Scripts:$PATH"
elif [ -d "frontend/node_modules/.bin" ]; then
    export PATH="$PWD/frontend/node_modules/.bin:$PATH"
fi
command -v sass >/dev/null || { echo "sass not found: run ./setup.sh first, or install sass globally"; exit 1; }

cd frontend
sass sass/main.scss css/style.css
echo "Sass compiled -> frontend/css/style.css"
