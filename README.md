# Whenevernote

Whenevernote is a web application where users can note taking and also create notebooks whenever they want. It is cloned from Evernote.

Welcome to check out a live version of Whenevernote here: [Whenever.com](https://whenever-note.herokuapp.com/)

## Built With
  - React.js
  - Redux
  - Javascript
  - HTML
  - CSS
  - Express
  - Sequelize
  - PostgreSQL

## Features
  - Sign up / login with email or username
  - Logged in users can:
    - Create new notes
    - Edit their made notes
    - Delete their made notes
    - Create new notebook
    - Delete their made notebook and delete all notes included at the same time

## Getting Started

  1. Clone this repository

    `git clone https://github.com/ellen20/WheneverNote.git`

  2. Install dependencies

    - While inside /backend Run `npm install`
    - While inside /fronten Run `npm install`

  3. Create a .env file based on the .env.example given

  4. Setup your username and database based on what you setup in your .env

  5. Migrate and Seed models

    `npx dotenv sequelize db:migrate` && `npx dotenv sequelize db:seed:all`

  6. Start the app using:

    - While inside /backend Run `npm start`
    - While inside /fronten Run `npm start`

  7. You can use the Demo user or create an account.

## Heroku Deployment
  1. Create a Heroku account if you don't have one already
  2. Create a new application in the dashboard, for example "Whendevernote"
  3. Under the "Resources" tab, click "Find More add-ons", and add "Heroku Postgres"
  4. Install Heroku CLI 
  6. Login to Heroku by running this in the terminal `heroku login`
  7. Inside the repo folder, add Heroku as a remote to the project repo by typing `heroku git:remote -a <name-of-Heroku-app>`
     (replace <name-of-Heroku-app> with the name of the application you made, for example "Whenevernote")
  8. Back in Heroku, inside the "Settings" page of your newly created app, click on "Reveal Config Vars", and add the variables from the .env file for JWT_EXPIRES_IN and JWT_SECRET for Heroku.
  9. Push the project up to Heroku by typing git push heroku main by typing `git push heroku master`
  10. To migrate and seed the data base, run the following commands:
    - heroku run npm run sequelize db:migrate
    - heroku run npm run sequelize db:seed:all
  11. To start it `heroku open`
