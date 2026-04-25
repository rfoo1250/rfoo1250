#!/usr/bin/env bash
set -e

# Add nodevenv binaries to PATH (bin/ on Unix, Scripts/ on Windows/Git Bash)
if [ -d "nodevenv/bin" ]; then
    export PATH="$(pwd)/nodevenv/bin:$PATH"
elif [ -d "nodevenv/Scripts" ]; then
    export PATH="$(pwd)/nodevenv/Scripts:$PATH"
fi

# go to frontend
cd frontend

# call sass compile
sass sass/main.scss css/style.css

echo ""
echo "Sass compiled. To compile again, run:"
echo "sass sass/main.scss css/style.css"
