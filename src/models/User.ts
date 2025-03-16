import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // schema es como la forma en la que se va a guardar el usuario
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const User = mongoose.model('User', userSchema);

export default User;
