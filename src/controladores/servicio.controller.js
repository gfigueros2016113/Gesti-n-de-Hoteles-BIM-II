'use strict'

var servicioModel = require('../modelos/servicio.model');

function registrarServicio (req,res){
    var servicio = new servicioModel();
    var params = req.body;
    var hotelID = req.params.hotelID;

    if(req.user.rol != 'ROL_CLIENTE'){
        if(params.nombre && params.precio){
            servicio.nombre = params.nombre;
            servicio.precio= params.precio;
            servicio.hotelID=hotelID;

            servicioModel.find({
                $or:[{nombre: servicio.nombre}]
            }).exec((err, encontrarServicio)=>{
                if(err) return res.status(404).send({mensaje: 'Error en la peticion'});
                if(encontrarServicio && encontrarServicio.length == 1) return res.status(404).send({mensaje: 'Este servicio ya existe'});
                servicio.save((err,guardarServicio)=>{
                    if(err) return res.status(404).send({mensaje:'Error al guardar el servicio'});
                    if(!guardarServicio) return res.status(404).send({mensaje:'Error en la peticion'});
                    return res.status(200).send({guardarServicio})
                })
            })
        }
    }
}



module.exports = {
    registrarServicio
}