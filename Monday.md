1. Add Demo User
- frontend/src/components/LoginFormModal/LoginForm.js

const onClick = () => {
        setErrors([]);
        setCredential("Demo-lition");
        setPassword("password");
        return dispatch(sessionActions.login({ credential: "Demo-lition", password:"password" })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    }

 <button type="button" onClick={onClick}>Demo User</button>

2. Create Tables(Notebook, Note)

npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all

 - npx sequelize model:generate --name Notebook --attributes userId:integer,title:string

  - npx sequelize model:generate --name Note --attributes userId:integer,notebookId:integer,title:string,content:text

  - npx dotenv sequelize db:migrate

3. Create Seeders(Notebook, Note)
  - npx sequelize seed:generate --name demo-notebook
  - npx sequelize seed:generate --name demo-note
  - npx dotenv sequelize db:seed:all

4. Plan frontend routes and components and approach.
