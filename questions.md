1. notebooks delete feature half-done:
- problem: only delete in database not in browser, but when refresh browser updated...
- my try: store created action creator and reducer for delete

2. want sort by recent added notebooks
- my try:
  in api when findAll using order: [["createdAt": "DESC"]] not working...
- how to sort in React???

3. heroku error
- problem: when I click delete button many times... it occured error
  I gues heroku database has error...how to fix it?

heroku restart && heroku pg:reset DATABASE --confirm <<app name>> && heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all

heroku restart && heroku pg:reset DATABASE --confirm whenever-note && heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all

4. ol li number no showing...
