const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook } = require('../../db/models');
const router = express.Router();
// const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNotebook = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.')
];

router.get('/', asyncHandler(async (req, res) => {
    const notebooks = await Notebook.findAll();
    return res.json({
        notebooks
    })
}));

// Create Notebook
router.post(
    '/',
    validateNotebook,
    asyncHandler(async (req, res) => {
        const { userId, title } = req.body;
        const notebook= await Notebook.create({ userId, title });

        return res.json({
            notebook
        });
    })
);

//Edit Notebook

router.put(
    '/',
    validateNotebook,
    asyncHandler(async (req, res) => {
        const { userId, title } = req.body;
        const notebook = await Notebook.update({ userId, title });

        return res.json({
            notebook
        });
    })
);

//Delete NoteBook









module.exports = router;
