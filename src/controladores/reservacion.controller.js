'use strict'

var reservacionModel = require('../modelos/reservacion.model');
var habitacionModel = require('../modelos/habitacion.model');
var servicioModel = require('../modelos/servicio.model');
const fecha = new Date();



function registroReservacion(req, res){
    var params = req.body;
    var usuarioID = req.user.sub;
    var habitacionID = req.params.habitacionID
    var reservacion = new reservacionModel();
    var habitacion = new habitacionModel();

    if(req.user.rol != 'ROL_CLIENTE') return res.stattus(404).send({mensaje:'No tienes permisos para realizar una reservacion'})
    if(params.checkIn>params.checkOut) return res.status(404).send({mensaje: 'Error en la peticion'});
    var fechaIn = new Date(params.checkIn);
    if(fecha>=fechaIn) return res.status(404).send({mensaje: 'Esta fecha esta caducada'});
    if(fecha==fechaIn) return res.status(404).send({mensaje: 'No es posible reservar en esta fecha, intenta en un dia antes'})
    reservacionModel.find({habitacionID:habitacionID, $or:[{estado:'Reservado'},{ estado:'En curso'}]}, (err, encontrarReservacion)=>{
        if (err) return res.status(404).send({mensaje: ' Error en la reservacion'});
        encontrarReservacion.forEach(Element=>{
            if(params.checkIn<=Element.checkIn && params.checkIn>=Element.checkOut){
               return res.status(404).send({mensaje: 'Esta habitacion ya esta reservada, intenta en otra fecha'});
            }
            if(params.checkOut<=Element.checkIn && params.checkOut>=Element.checkOut){
               return res.status(404).send({mensaje: 'Esta habitacion ya esta reservada, intenta en otra fecha'})
            }
        })
        habitacionModel.findById(habitacionID, (err, encontrarHabitacion)=>{
            if(err) return res.status(404).send({mensaje: 'Error en la peticion2'});
            if(!encontrarHabitacion) return res.status(404).send({mensaje:'Error en la peticion3'});
            reservacion.checkIn=params.checkIn;
            reservacion.checkOut=params.checkOut;
            reservacion.estado='Reservado';
            reservacion.habitacionID=habitacionID;
            reservacion.usuarioID=usuarioID;
            reservacion.save((err,guardarReservacion)=>{
                if(err) return res.status(404).send({mensaje:'Error en la peticion4'});
                if(!guardarReservacion) return res.status(404).send({mensaje:'Error en la peticion5'});
                return res.status(200).send(guardarReservacion);
            })            
        })
    })
}

function servicioReservacion(req,res){
    var reservacionID = req.params.reservacionID;
    var servicioID = req.params.servicioID;
    var servicio = new servicioModel();

    reservacionModel.findOne({_id:reservacionID}, (err,encontrarReservacion)=>{
        for(let x=0; x<encontrarReservacion.servicioID.length; x++){
            if(encontrarReservacion.servicioID[x]==servicioID){
                return res.status(404).send({mensaje:'Este servicio ya existe en la reservacion'});
            }
        }
        reservacionModel.findOneAndUpdate({_id: reservacionID},
            {$push:{servicioID:servicioID}},{new:true},(err,actualizarReservacion)=>{
            if(err) return res.status(404).send({mensaje: 'Error al actualizar reservacion'});
            if(!actualizarReservacion) return res.status(404).send({mensaje:'Error en la peticion'});
            return res.status(200).send(actualizarReservacion);
        })
    })
}
        

module.exports = {
    registroReservacion,
    servicioReservacion
}