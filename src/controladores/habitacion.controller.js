'use strict'

var habitacionModel = require('../modelos/habitacion.model');
var hotelModel = require('../modelos/hotel.model');

function registrarHabitacion(req,res) {
    var hotelID = req.params.hotelID
    var params= req.body;
    var habitacion = new habitacionModel();
 
    if(req.user.rol != 'ROL_CLIENTE'){
        if(params.nombre && params.precio ){
            habitacion.nombre = params.nombre;
            habitacion.precio = params.precio;
            habitacion.hotelID = hotelID;
            habitacionModel.find({$or: [
                {nombre: habitacion.nombre},
            ]}).exec((err, encontrarHabitacion)=>{
                if(err) return res.status(404).send({mensaje:'Error en la peticion'});
                if(encontrarHabitacion && encontrarHabitacion.length == 1){
                    return res.status(404).send({mensaje: 'la habitacion ya esta en existencia'})
                }else{
                    hotelModel.findById(hotelID,(err,hotelEncontrado)=>{
                        if(err) return res.status(404).send({mensaje: 'Error en la petición'});
                        if(!hotelEncontrado) return res.status(404).send({mensaje: 'El hotel no existe'});
                        habitacion.save((err,habitacionGuardada)=>{
                            if(err) return res.status(404).send({mensaje: 'Error en la petición'});
                            if(habitacionGuardada){
                                return res.status(200).send({habitacionGuardada});
                            }
                        })
                    })

                }
            })
        }else{
            return res.status(404).send({mensaje: 'Debes llenar todos los campos'})
        }
    }else{
        return res.status(404).send({mensaje: 'No posee los permisos necesarios para realizar esta peticion'});
    }
}

function obtenerHabitaciones(req,res){
    var hotelID = req.params.hotelID;
        habitacionModel.find({hotelID:hotelID},(err, encontrarHabitacion)=>{
            if(err) return res.status(404).send({mensaje:'Error en la peticion'});
            if(!encontrarHabitacion) return res.status(404).send({mensaje:'Error en la peticion'});
            return res.status(200).send({HabitacionesDelHotel: encontrarHabitacion});
        })
}

module.exports = {
    registrarHabitacion,
    obtenerHabitaciones
}