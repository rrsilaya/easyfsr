<h1 align="center">
  Faculty Service Record (FSR) Management System
</h1>

## Installation

1. Install the latest version of [yarn](https://yarnpkg.com/) and [node](https://http://nodejs.org//).
2. Run the API server.
3. Start the development server with `yarn start`.

For more information on installation of tools, see the wiki page.

## Project Structure

```
.
├── node_modules/
├── public/
├── src/
│   ├── api/                          # API calls
│   │   ├── <entity>.js
│   │   └── index.js
│   ├── app/                          # application configs
│   │   ├── App.js
│   │   ├── store.js
│   │   ├── styles.css
│   │   └── theme.js                  # overridable theme
│   ├── assets/
│   ├── global/                       # global and reusable components
│   │   ├── <component>/
│   │   │   └── <Component>.js
│   │   └── index.js                  # export components here
│   ├── pages/
│   │   ├── <component>
│   │   │   ├── <Component>.js
│   │   │   ├── <ComponentContainer>.js
│   │   │   ├── duck.js               # redux duck
│   │   │   └── style.styl
│   │   ├── index.js                  # combine reducers here
│   │   └── styles.styl               # require all styles here
│   ├── index.css
│   ├── index.js
│   └── registerServiceWorker.js
├── config-overrides.js
├── package.json
├── README.md
└── yarn.lock
```

## Coding Conventions

For more information about coding conventions, please see the wiki page.
