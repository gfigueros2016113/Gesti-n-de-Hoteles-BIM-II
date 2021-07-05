'use strict'

const tipoEventoModel = require('../modelos/tipoEvento.model');


function registrarTipoEvento (req, res){
    var params = req.body;
    var tipoEvento = new tipoEventoModel();
    if(req.user.rol != 'ROL_CLIENTE'){
        if (params.nombre){
            tipoEvento.nombre = params.nombre;
        }
        tipoEventoModel.find({$or:[{nombre: tipoEvento.nombre}] }).exec((err,encontrarTipoEvento) =>{
        if(err) return res.status(404).send({ mensaje: 'Error en la peticion'});
        if(encontrarTipoEvento && encontrarTipoEvento.length == 1) return res.status(404).send({mensaje:'Este Tipo esta en existencia'});
        tipoEvento.save((err, encontrarTipoEvento) => {
            if(err) return res.status(404).send({mensaje: 'No se ha podido guardar el Tipo'});
            if(!encontrarTipoEvento) return res.status(404).send({ mensaje: 'Error al registrar Tipo'})
            return res.status(200).send({encontrarTipoEvento})
        })
        })
    }else{
        res.status(404).send({ mensaje: 'no tienes permisos para registrar un tipo de evento'})
    }
}


module.exports={
    registrarTipoEvento
}