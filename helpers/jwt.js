import  Jwt from "jsonwebtoken";

export const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = {uid, name};

        Jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error){
                console.log(error);
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    } )
}