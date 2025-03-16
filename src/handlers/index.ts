import User from '../models/User';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import slug from 'slug';
import { hashPassword } from '../utils/auth';

export const createAccount = async(req: Request, res: Response): Promise<void> => {

    //Manejo de errores
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    const {email, password} = req.body

    const userExist = await User.findOne({email})
    if(userExist){
       const error = new Error('Un usuario con ese mail ya está registrado')
       res.status(409).json({error: error.message})
       return
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({handle})
    if (handleExist) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({error: error.message})
        return
    }

    const user = new User(req.body);
    const hash = await hashPassword(password)
    user.password = hash
    user.handle = handle
    
    await user.save();
    res.status(201).json({
        message: 'Usuario creado correctamente',
        user
    });
}