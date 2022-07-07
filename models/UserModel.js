import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})

export const UserModel = mongoose.model('Users', UserSchema);