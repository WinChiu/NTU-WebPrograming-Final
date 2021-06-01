import { Router } from 'express';
import NoteRouter from './Note';

const router = Router();

router.use('/', NoteRouter);

export default router;