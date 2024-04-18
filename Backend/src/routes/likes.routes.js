import {Router} from 'express';
import { like } from '../controllers/like.controller.js';


const router = Router();

// Comment routes
router.post('/likes', like);


export default router;