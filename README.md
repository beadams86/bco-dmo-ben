# BCO-DMO Static Website

### Getting Started
- install dependencies: run `npm i`
- run `gulp auto` to run on localhost with browser auto-reload

# Basics
- `src/pages` for page content
- `src/templates` for page layout
- output is plain html (stored in `dist` directory)

## Directory Layout
- `dist` : this directory contains real files that will be hosted
- `dist/assets` : all css, js, images, fonts and whatever assets related to app are located here
- `src` : raw files used to develop the app
- `src/pages` : pages for the app, everything here will be rendered to `dist` directory
- `src/templates` : layout files
- `src/templates/components` : partial files like nav, user-tabs, menu, etc

---

Nunjucks official docs: [https://mozilla.github.io/nunjucks]([https://mozilla.github.io/nunjucks)
