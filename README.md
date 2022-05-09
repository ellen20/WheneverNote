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
