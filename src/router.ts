import {Router} from 'express';

const router = Router();

//Routing
// Ejemplo de Autenticación y registro
router.post('/auth/register', (req, res) => {
    console.log(req.body);
    
});

export default router;