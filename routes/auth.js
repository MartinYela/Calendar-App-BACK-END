import express from 'express';
import { createUser, loginUser, renewUser } from '../controllers/auth.js';
import { check, body } from 'express-validator';
import { validationFields } from '../middlewares/validationFields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = express.Router();

router.route('/new')
    .post(
        [
            body('name', 'El nombre es obligatorio').not().isEmpty(),
            body('email', 'El email es obligatorio').isEmail(),
            body('password', 'El pasword debe tener al menos 6 caracteres').isLength({min:6}),
            validationFields
        ],
        createUser);

router.route('/')
    .post(
        [
            body('email', 'El email es obligatorio').isEmail(),
            body('password', 'El pasword debe tener al menos 6 caracteres').isLength({min:6}),
            validationFields
        ],
        loginUser);

router.route('/renew')
    .get(validateJWT, renewUser)


export default router;