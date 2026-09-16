import express from 'express';
import getUser from '../controllers/user/getUser';
import patchUser from '../controllers/user/patchUser';

const router = express.Router();

router.get('/:id', getUser);
router.patch('/:id', patchUser);

export default router;
