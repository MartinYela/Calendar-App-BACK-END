import express from "express";
import { body } from 'express-validator';
import { getEvents, createEvents, updateEvents, deleteEvents } from "../controllers/events.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validationFields } from "../middlewares/validationFields.js";
import { isDate } from "../helpers/isDate.js";

const router = express.Router();

router.use(validateJWT)

router.route('/')
    .get(getEvents)
    .post(
        [
            body('title', 'El título es obligatorio').not().isEmpty(),
            body('start', 'La Fecha de inicio es obligatoria').custom(isDate),
            body('end', 'La Fecha de fin es obligatoria').custom(isDate),
            validationFields
        ],
        createEvents)

router.route('/:id')
    .put(
        [
            body('title', 'El título es obligatorio').not().isEmpty(),
            body('start', 'La Fecha de inicio es obligatoria').custom(isDate),
            body('end', 'La Fecha de fin es obligatoria').custom(isDate),
            validationFields
        ],
        updateEvents)
    .delete(deleteEvents)

export default router;
