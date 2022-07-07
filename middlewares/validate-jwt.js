import Jwt from "jsonwebtoken";

export const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la app'
        });
    }

    try {
        const {uid, name} = Jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        
        req.uid = uid;
        req.name= name;
        

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }

    next()
}