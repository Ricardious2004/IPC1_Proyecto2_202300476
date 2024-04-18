import {Router} from 'express';
import { post } from '../controllers/post.controller.js';


const router = Router();

// Comment routes
router.post('/posts', post);


export default router;