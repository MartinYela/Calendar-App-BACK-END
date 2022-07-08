import { EventModel } from '../models/Events.js';

export const getEvents = async (req, res) => {

    const events = await EventModel.find().populate('user', 'name');

    res.status(201).json({
        ok: true,
        events
    })


}

export const createEvents = async (req, res) => {

    const event = new EventModel(req.body);

    try {
        event.user = req.uid;
        const saveEvent = await event.save();

        res.status(201).json({
            ok: true,
            saveEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador de la página'
        })
    }


}

export const updateEvents = async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await EventModel.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para editar esta nota'
            })
        }

        const newEvent = {
            ...req.body,
            user:uid
        }

        const updateEvent = await EventModel.findByIdAndUpdate( eventId, newEvent, {new:true});

        res.status(201).json({
            ok: true,
            event: updateEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        })
    }

}

export const deleteEvents = async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await EventModel.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar este evento'
            })
        }

        const deleteEvent = await EventModel.findByIdAndDelete(eventId);

        res.status(201).json({
            ok: true,
            event: deleteEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        })
    }

}