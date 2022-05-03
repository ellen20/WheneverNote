Phase 1: Heroku Connection

1. Create account
https://signup.heroku.com/

2. Add new application
- name: whenever-note
- "Resources"(tab)/click "Find more add-ons"/add "Heroku Postgres" (with free Hobby Dev setting)

3. Install Heroku CLI
https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli

- brew tap heroku/brew && brew install heroku (in terminal)

4.
- heroku login
(logged in as jljin0524@gmail.com)
- heroku git:remote -a whenever-note (in project directory WheneverNote)

(set git remote heroku to https://git.heroku.com/whenever-note.git)

Phase 2: Setting up your Express + React application
-
// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.status(201).json({});
  });
}

module.exports = router;

-
//backend/package.json
 "scripts": {
    "sequelize": "sequelize",
    "sequelize-cli": "sequelize-cli",
    "start": "per-env",
    "start:development": "nodemon -r dotenv/config ./bin/www",
    "start:production": "node ./bin/www"
  },

-
//WheneverNote/package.json

"scripts": {
    "heroku-postbuild": "npm run build --prefix frontend",
    "install": "npm --prefix backend install backend && npm --prefix frontend install frontend",
    "dev:backend": "npm install --prefix backend start",
    "dev:frontend": "npm install --prefix frontend start",
    "sequelize": "npm run --prefix backend sequelize",
    "sequelize-cli": "npm run --prefix backend sequelize-cli",
    "start": "npm start --prefix backend"
  },

Phase 3: Deploy to Heroku
- "Settings" / "Config Vars"/Click the Reveal Config Vars button/ add...
JWT_SECRET=7Dhz8L43o/x8tw==
JWT_EXPIRES_IN=604800

- git add .
- git commit -m "deploy"
- git push heroku main:master
(https://whenever-note.herokuapp.com)

- heroku run npm run sequelize db:migrate
- heroku run npm run sequelize db:seed:all

heroku bash
    npm run sequelize db:migrate
heroku logs
heroku logs --tail
heroku open
