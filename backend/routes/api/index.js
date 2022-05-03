const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notebookRouter = require('./notebook');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/notebook', notebookRouter);

module.exports = router;
