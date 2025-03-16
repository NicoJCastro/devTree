import mongoose from "mongoose";

interface IUser {
    handle: string;
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({ // schema es como la forma en la que se va a guardar el usuario
    handle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const User = mongoose.model<IUser>('User', userSchema);

export default User;
