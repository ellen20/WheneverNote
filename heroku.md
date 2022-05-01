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
- heroku git:remote -a whenever-note

(set git remote heroku to https://git.heroku.com/whenever-note.git)

Phase 2: Setting up your Express + React application
