const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, Notebook } = require('../../db/models');
const router = express.Router();
// const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNote = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.')
];

router.get('/', asyncHandler(async (req, res) => {
    // const { userId } = req.params;

    const notes = await Note.findAll(
        // {where: {userId : userId},
        { include: Notebook}
        );

    return res.json({
        notes
    })
}));

// Create Note
router.post(
    '/',
    validateNote,
    asyncHandler(async (req, res) => {
        const { userId, notebookId, title, content } = req.body;
        const newNote= await Note.create({ userId, notebookId, title, content });
        const note = await Note.findByPk(newNote.id,{include: Notebook});

        return res.json({
            note
        });
    })
);

// Edit Note
router.patch(
    '/:noteId',
    validateNote,
    asyncHandler(async (req, res) => {
        const { userId, notebookId, title, content } = req.body;
        const { noteId } = req.params;

        const note = await Note.findByPk(noteId);
        await note.update({ userId, notebookId, title, content });
        const updatedNote = await Note.findByPk(noteId,{ include: Notebook});

        return res.json({
            updatedNote
        });
    })
);

//Delete Note
router.delete('/', async (req, res) => {
    const { id } = req.body;
    const note = await Note.findByPk(id);
    await note.destroy();

    return res.json({
        note
    })
})

// router.delete('/delete', async (req, res) => {
//     const { id } = req.body;
//     const notes = await Note.findAll(
//         { where:
//             { notebookId: id }
//         });

//     await notes.forEach(note => note.destroy());

//     return res.json({
//         notes
//     })
// })

module.exports = router;
