#!/usr/bin/env bash
set -e

# Run relative to this script, so it works from any cwd
cd "$(dirname "$0")"

# Find a local sass: nodevenv (bin/ on Unix, Scripts/ on Windows/Git Bash),
# then frontend/node_modules (after `npm install` in frontend/), else PATH
if [ -d "nodevenv/bin" ]; then
    export PATH="$PWD/nodevenv/bin:$PATH"
elif [ -d "nodevenv/Scripts" ]; then
    export PATH="$PWD/nodevenv/Scripts:$PATH"
elif [ -d "frontend/node_modules/.bin" ]; then
    export PATH="$PWD/frontend/node_modules/.bin:$PATH"
fi
command -v sass >/dev/null || { echo "sass not found: run 'npm install' in frontend/, or install sass globally"; exit 1; }

cd frontend
sass sass/main.scss css/style.css

echo ""
echo "Sass compiled. To compile again, run from frontend/:"
echo "sass sass/main.scss css/style.css"
