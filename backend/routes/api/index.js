const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notebookRouter = require('./notebook');
const noteRouter = require("./note");

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/notebook', notebookRouter);

router.use('/note', noteRouter);

module.exports = router;
