'use strict'

var eventoModel = require('../modelos/evento.model');

function registrarEvento(req, res){
var evento =eventoModel();
var params = req.body;
var tipoEventoID = req.params.tipoEventoID;
var hotelID = req.params.hotelID;

    if(req.user.rol != 'ROL_CLIENTE'){
        if(params.nombre && params.capacidad && params.fecha){
            evento.nombre = params.nombre;
            evento.capacidad = params.capacidad;
            evento.fecha = params.fecha;
            evento.hotelID = hotelID;
            evento.tipoEventoID = tipoEventoID;

            eventoModel.find({
                $or:[{nombre: evento.nombre}]
            }).exec((err, encontrarEvento)=>{
                if(err) return res.status(404).send({mensaje: 'Error en la peticion'});
                if(encontrarEvento && encontrarEvento.length == 1) return res.status(404).send({mensaje:'Este producto esta en existencia'});
                evento.save((err,guardarEvento)=>{
                    if(err) return res.status(404).send({mensaje:'No se ha podido guardar el Evento'});
                    if(!guardarEvento) return res.status(404).send({ mensaje: 'Error al registrar producto'})
                    return res.status(200).send({guardarEvento})
                })
            })
        }
    }
}

module.exports = {
    registrarEvento
}