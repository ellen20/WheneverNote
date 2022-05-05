======================
Phase0: BACKEND SET UP
======================
1. Root
- authenticate-me
- backend and frontend
- .gitignore
node_modules
.env
build
.DS_Store

2. Backend

** Dependencies:

- npm init -y   (initialize the server's package.json)
- npm install bcryptjs cookie-parser cors csurf dotenv express express-async-handler express-validator helmet jsonwebtoken morgan per-env pg@">=8.4.1" sequelize@5 sequelize-cli@5

1) bcryptjs - password hashing
2) cookie-parser - parsing cookies from requests
3) cors - CORS
4) csurf - CSRF protection
5) dotenv - load environment variables into Node.js from a .env file
6) express - Express
7) express-async-handler - handling async route handlers
8) express-validator - validation of request bodies
9) helmet - security middleware
10) jsonwebtoken - JWT
11) morgan - logging information about server requests/responses
12) per-env - use environment variables for starting app differently
13) pg@">=8.4.1" - PostgresQL greater or equal to version 8.4.1
14) sequelize@5 - Sequelize
15) sequelize-cli@5 - use sequelize in the command line

- npm install -D dotenv-cli nodemon

1) dotenv-cli - use dotenv in the command line
2) nodemon - hot reload server backend files

** Configuration:

- .env (be used to define your environment variables.)

PORT=5000
DB_USERNAME=auth_app
DB_PASSWORD=«auth_app user password»
DB_DATABASE=auth_db
DB_HOST=localhost
JWT_SECRET=YV4Nodc1pSNPRg==
JWT_EXPIRES_IN=604800

«generate_strong_secret_here»//Run <openssl rand -base64 10> to generate a random JWT secret.

- backend/config/index.js (create a js configuration file that will read the environment variables loaded and export them.)

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  }
};

(Each environment variable will be read and exported as a key from this file.)

** Sequelize Setup

- .sequelizerc (set up the backend/db folder to contain all the files for models, seeders, and migrations.)

// backend/.sequelizerc
const path = require('path');

module.exports = {
  config: path.resolve('config', 'database.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};

- npx sequelize init (Initialize Sequelize to the db folder, will create db folder with models, seeders and migrations subflder and in confi/database.js)

- replace <backend/config/database.js>

const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

(This will allow you to load the database configuration environment variables from the .env file into the config/index.js.)

- psql -c "CREATE USER auth_app PASSWORD 'password' CREATEDB"
CREATE ROLE (create user)
- npx dotenv sequelize db:create (create database)
(Remember, any sequelize db: commands need to be prefixed with dotenv to load the database configuration environment variables from the .env file.)

** Express Setup

- app.js (set up all the pre-request middleware)

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');//Helmet helps you secure your Express apps by setting various HTTP headers.
const cookieParser = require('cookie-parser');

const { environment } = require('./config');//Create a variable called isProduction that will be true if the environment is in production or not by checking the environment key in the configuration file (backend/config/index.js):
const isProduction = environment === 'production';//will true if environment is production
const app = express();

app.use(morgan('dev'));//Connect the morgan middleware for logging information about requests and responses
app.use(cookieParser());//Add the cookie-parser middleware for parsing cookies
app.use(express.json());//express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json"

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());//CORS isn't needed in production since all of our React and Express resources will come from the same origin.
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({   //https://www.npmjs.com/package/helmet
        policy: "cross-origin"//React is generally safe at mitigating XSS (i.e., Cross-Site Scripting) attacks, but do be sure to research how to protect your users from such attacks in React when deploying a large production application. Now add the crossOriginResourcePolicy to the helmet middleware with a policy of cross-origin. This will allow images with URLs to render in deployment.
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",//???
            httpOnly: true //The csurf middleware will add a _csrf cookie that is HTTP-only (can't be read by JavaScript)to any server response.
        }
    })
);//The csurf middleware will add a _csrf cookie that is HTTP-only (can't be read by JavaScript) to any server response. It also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on. These two cookies work together to provide CSRF (Cross-Site Request Forgery) protection for your application. The XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET. This header will be used to validate the _csrf cookie to confirm that the request comes from your site and not an unauthorized site.

** Routes

- backend/routes/index.js

const express = require('express');
const router = express.Router();

router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());//setting a cookie on the response with the name of XSRF-TOKEN to the value of the req.csrfToken method's return
    res.send('Hello World!');
});

module.exports = router;

- backend/app.js

const routes = require('./routes');

app.use(routes); // Connect all the routes

module.exports = app;

- backend/bin/www  (Here, you will be starting your Express application to listen for server requests only after authenticating your database connection.))

#!/usr/bin/env node
// backend/bin/www
const { port } = require('../config');

const app = require('../app');
const db = require('../db/models');

// Check the database connection before starting the app
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

    // Start listening for connections
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
  });


- package.json

"scripts": {
    "sequelize": "sequelize",
    "sequelize-cli": "sequelize-cli",
    "start": "per-env",
    "start:development": "nodemon -r dotenv/config ./bin/www",
    "start:production": "node ./bin/www"
  }
==================
Phase1: API Routes
==================
- backend/routes/api/index.js

const router = require('express').Router();

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;

- backend/routes/index.js

const apiRouter = require('./api');

router.use('/api', apiRouter);

=======================
Phase 2: Error Handling
=======================
1. Resource Not Found Error-Handler

// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

2. Sequelize Error-Handler

// backend/app.js
// ...
const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

3. Error Formatter Error-Handler

// backend/app.js
// ...
// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

============================
Phase 3: User Authentication
============================

1. Users Table Migration

- npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

- db/migrations/...js

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};

- npx dotenv sequelize db:migrate
  (undo: npx dotenv sequelize db:migrate:undo
  checkout: psql <database name> -c '\d "Users"')

2. User Model

- db/models/user.js

//https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/

'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};

3. User Seeds

- npx sequelize seed:generate --name demo-user

- db/seeders/....js

'use strict';
const bcrypt = require('bcryptjs');//

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

- npx dotenv sequelize db:seed:all
(undo: npx dotenv sequelize db:seed:undo
check: psql <database name> -c 'SELECT * FROM "Users"' )

4. Model Scopes - Protecting Users' Information
//https://sequelize.org/docs/v6/other-topics/scopes/
//To ensure that a user's information like their hashedPassword doesn't get sent to the frontend, you should define User model scopes.
//prevent certain fields from being sent in a query
>>>//User.scope('currentUser').findByPk(id)

{
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }

(These scopes help protect sensitive user information that should not be exposed to other users)

5. Authentication Flow

- Backend login flow:

1. The API login route will be hit with a request body holding a valid credential (either username or email) and password combination.
2. The API login handler will look for a User with the input credential in either the username or email columns.
3. Then the hashedPassword for that found User will be compared with the input password for a match.
4. If there is a match, the API login route should send back a JWT in an HTTP-only cookie and a response body. The JWT and the body will hold the user's id, username, and email.

- Backend sign-up flow:

1. The API signup route will be hit with a request body holding a username, email, and password.
2. The API signup handler will create a User with the username, an email, and a hashedPassword created from the input password.
3. If the creation is successful, the API signup route should send back a JWT in an HTTP-only cookie and a response body. The JWT and the body will hold the user's id, username, and email.

- Backend logout flow:

1. The API logout route will be hit with a request.
2. The API logout handler will remove the JWT cookie set by the login or signup API routes and return a JSON success message.

6. User Model Methods
- backend/db/models/user.js
//This method will return an object with only the User instance information that is safe to save to a JWT
  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };
//It should accept a password string and return true if there is a match with the User instance's hashedPassword. If there is no match, it should return false
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
//make sure import bcrypt package

//It should use the currentUser scope to return a User with that id.
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

//Define a static method User.login in the user.js model file. It should accept an object with credential and password keys. The method should search for one User with the specified credential (either a username or an email). If a user is found, then the method should validate the password by passing it into the instance's .validatePassword method. If the password is valid, then the method should return the user by using the currentUser scope.
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

//Define a static method User.signup in the user.js model file that accepts an object with a username, email, and password key. Hash the password using the bcryptjs package's hashSync method. Create a User with the username, email, and hashedPassword. Return the created user using the currentUser scope.
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

7. User Auth Middlewares

- backend/utils/auth.js

const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

- setTokenCookie

//setting the JWT cookie after a user is logged in or signed up
const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

- restoreUser

//Certain authenticated routes will require the identity of the current session user. You will create and utilize a middleware function called restoreUser that will restore the session user based on the contents of the JWT cookie. Create a middleware function that will verify and parse the JWT's payload and search the database for a User with the id in the payload. (This query should use the currentUser scope since the hashedPassword is not needed for this operation.) If there is a User found, then save the user to a key of user onto the request. If there is an error verifying the JWT or a User cannot be found with the id, then clear the token cookie from the response.
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

- requireAuth

// If there is no current user, return an error
const requireAuth = [
    restoreUser,
    function (req, _res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
============================
** Phase 4: User Auth Routes
============================
Login: POST /api/session
Logout: DELETE /api/session
Signup: POST /api/users
Get session user: GET /api/session

- backend/routes/api/session.js

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
>>>>>>>>>>>>>>>>>>>>>>>
//Restore session user
>>>>>>>>>>>>>>>>>>>>>>>
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

>>>>>>>>>>>>>>>>>>>>>>>
// User Login API Route
>>>>>>>>>>>>>>>>>>>>>>>
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);
>>>>>>>>>>>>>>>>>>>>>>>>
// User Logout API Route
>>>>>>>>>>>>>>>>>>>>>>>>
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

module.exports = router;

>>>>>>>>>>>
Test Login:
>>>>>>>>>>>
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`// change value here
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })// credential can either username or email
}).then(res => res.json()).then(data => console.log(data));
>>>>>>>>>>>
Test Logout:
>>>>>>>>>>>
fetch('/api/session', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`//change here
  }
}).then(res => res.json()).then(data => console.log(data));

- backend/routes/api/users.js

const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
>>>>>>>>>>>>>>>>>>>>>
User Signup API Route
>>>>>>>>>>>>>>>>>>>>>
// Sign up
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

module.exports = router;

>>>>>>>>>>>>>>>>>>>>>
Test Signup API Route
>>>>>>>>>>>>>>>>>>>>>
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`//change here
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',//should unique
    username: 'Spidey',//should unique
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));

- backend/routes/api/index.js (Connect all the routes exported from these two files in the index.js file)

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
====================================
Phase 5: Validating the Request Body
====================================
- backend/utils/validation.js

const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Validating Login Request Body
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
- backend/routes/api/session.js

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,// add here!!!!
    asyncHandler(async (req, res, next) => {

>>>>>>>>>>>>>>>>>>>>>>>>>
Test the Login Validation
>>>>>>>>>>>>>>>>>>>>>>>>>
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: '', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Validating Signup Request Body
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
- backend/routes/api/users.js

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// Sign up
router.post(
  '/',
  validateSignup,//add here!!!!
  asyncHandler(async (req, res) => {
>>>>>>>>>>>>>>>>>>>>>>>>>>>
Test the Signup Validation
>>>>>>>>>>>>>>>>>>>>>>>>>>>
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({
    email: 'firestar@spider.man',
    username: 'Firestar',
    password: ''
  })
}).then(res => res.json()).then(data => console.log(data));
