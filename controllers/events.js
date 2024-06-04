const { response } = require('express')

const Evento = require('../models/Evento')

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name')

    res.status(200).json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {
    
    const evento = new Evento(req.body)

    try {

        evento.user = req.uid

        const eventoGuardado = await evento.save()


        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            mgs: 'Hable con el administrador'
        })
    }
    
}

const actualizarEventos = async (req, res = response) => {

    const { id: eventoId } = req.params
    const { uid } = req
    
    try {
        const evento = await Evento.findById(eventoId)

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            })
        }

        if ( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {
            new: true
        })

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

   
}

const eliminarEventos = async (req, res = response) => {

    const { id: eventoId } = req.params
    const { uid } = req
    
    try {

        const evento = await Evento.findById( eventoId )

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            })
        }

        if ( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento.'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        res.status(200).json({ ok: true })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEventos,
    eliminarEventos
}