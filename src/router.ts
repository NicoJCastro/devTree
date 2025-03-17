import { Router, RequestHandler } from 'express';
import { body } from 'express-validator';
import { createAccount, login } from './handlers';

const router = Router();

//Routing

// ********** Autenticación y registro **********

router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vacío'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacía'),
    body('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo'),    
    createAccount as RequestHandler);

router.post('/auth/login',
    body('email').notEmpty().withMessage('El email no puede ir vacío'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacía'),    
    login as RequestHandler);

export default router;