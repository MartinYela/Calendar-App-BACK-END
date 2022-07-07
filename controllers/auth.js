import { UserModel } from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import { generateJWT } from "../helpers/jwt.js";

export const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                ok: true,
                msg: 'Este email ya está registrado',
            })
        }

        user = new UserModel(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario no existe',
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: true,
                msg: 'Contraseña incorrecta',
            })
        }

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

export const renewUser = async (req, res) => {

    const {uid, name} = req; 

    try {
        const token = await generateJWT(uid, name);

        res.status(201).json({
            ok: true,
            uid: uid,
            name: name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}