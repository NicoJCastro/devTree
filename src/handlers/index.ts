import User from '../models/User';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import slug from 'slug';
import { hashPassword, comparePassword } from '../utils/auth';

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

export const login = async(req: Request, res: Response): Promise<void> => {

    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
       const error = new Error('No existe un usuario con ese email')
       res.status(404).json({error: error.message})
       return
    }

    const isMatch = await comparePassword(password, user.password)
    if(!isMatch){
        const error = new Error('La contraseña es incorrecta')
        res.status(401).json({error: error.message})
        return
    }

    console.log("Iniciaste sesión correctamente")

    
}
