import express from 'express';
import postNote from '../controllers/notes/postNote';
import patchNote from '../controllers/notes/patchNote';
import getNoteById from '../controllers/notes/getNoteById';
import getNotes from '../controllers/notes/getNotes';


const router = express.Router();

router.get('/', getNotes);
router.post('/', postNote);
router.get('/me', getNotes);
router.get('/:id', getNoteById);
router.patch('/:id', patchNote);

export default router;
