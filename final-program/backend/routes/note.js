import { Router } from 'express';
import ScoreCard from '../models/schema';
import { getItems,createItem } from './getimage.js';

const router = Router();


router.get('/',getItems)
router.post('/',createItem);


export default router;
