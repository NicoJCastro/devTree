import { Router, RequestHandler } from 'express';
import { body } from 'express-validator';
import { createAccount } from './handlers';

const router = Router();

//Routing
// ********** Autenticación y registro **********
router.post('/auth/register',
    body('handle').notEmpty(),
    
    
    createAccount as RequestHandler);

export default router;