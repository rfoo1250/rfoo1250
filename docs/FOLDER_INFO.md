# Folder Information
This document describes the purpose and structure of key project folders. It provides sufficient context to understand how files are organized while avoiding unnecessary nesting. 

If a folder is not written or mentioned here, it is not important and can be ignored. So keep this updated for development and coding.

The files on root are either entry points or meant to be there.

# backend/
Deployed on Render (free hosting). Contains the Node.js server (`server.js`), its `package.json`, and `.env.example` for environment variable reference.

# docs/
You’re here 🙂 This folder contains all the project’s documentation. No fancy stuff, no external storage — just clear, simple docs written in Markdown or plain text.

# frontend/
Just to organize all the nitpicky frontend subfolders and HTMLs. Contains the compiled CSS, Sass source, assets, data, and JS entry point.

## frontend/assets/
Contains project assets such as static images, GIFs, and other media files. Organized by file type:
- `jpeg/` — JPEG/JPG photos and project images
- `pdf/` — PDF documents (resume, certificates, dean’s list letters, etc.)
- `png/` — PNG icons and images (social icons, profile photo, etc.)
- `svg/` — SVG files (background, hamburger menu icons)
- `topographic-map-background/` — licensed topographic map background files (.ai, .eps, .jpg)

## frontend/css/
Contains all the css rules and code files.

## frontend/data/
Contains static data files loaded at runtime.
- `json/` — JSON files (`journey.json`, `publications.json`) that drive dynamic content injection on the page.

## frontend/sass/
Contains all code for Sass, superset of CSS, fancier rules.