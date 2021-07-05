'use strict'

var hotelModel = require('../modelos/hotel.model');
var usuarioModel = require('../modelos/usuario.model');
var eventoModel = require('../modelos/evento.model');
const gerente = 'ROL_GERENTE';


function registrarHotel  (req, res) {
    var hotel = new hotelModel();
    var usuarioID = req.params.usuarioID;
    var params = req.body;
  
    if (req.user.rol === 'ROL_ADMIN') {
      if (params.nombre && params.direccion) {
        hotel.nombre = params.nombre;
        hotel.direccion = params.direccion;
        hotel.usuarioID = usuarioID;
  
        usuarioModel.findById(usuarioID, (err, encontrarUsuario) => {
          if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
          

        });
  
        hotelModel.find({
          usuarioID: usuarioID,
        }).exec((err, encontrarHotel) => {
          if(err) return res.status(404).send({mensaje: 'Error en la peticion'});
          if(encontrarHotel && encontrarHotel.length >= 1) return res.status(404).send({mensaje: 'El usuario ya trabaja en otro hotel'});
          hotelModel.find({
            $and: [{ nombre: hotel.nombre, direccion: hotel.direccion }],
          }).exec((err, guardarHotel) => {
            if (err)
              return res.status(404).send({ mensaje: 'Error en la peticion' });
            if (guardarHotel && guardarHotel.length == 1) {
              return res.status(404).send({ mensaje: 'Error al guardar hotel' });
            } else {
              hotel.save((err, hotelGuardado) => {
                if (err)
                  return res.status(404).send({ mensaje: 'Error al guardar el hotel' });
  
                if (hotelGuardado) {
                  return res.status(200).send(hotelGuardado);
                } else {
                  return res.status(404).send({ mensaje: 'No se ha podido guardar el hotel' });
                }
              });
            }
          });
        }) 
      } else {
        return res.status(404).send({ mensaje: 'Error en la peticion' });
      }
    } else {
      return res.status(404).send({ mensaje: 'Error en la peticion' });
    }
}
  
function editarHotel  (req, res) {
  var hotelID = req.params.hotelID;
  var params = req.body;

    if (req.user.rol === 'ROL_CLIENTE') return res.status(404).send({ message: 'NO TIENES PERMISOS PARA EDITAR ESTE HOTEL' });
    hotelModel.findByIdAndUpdate( hotelID, params,{ new: true },(err, actualizarHotel) => {
        if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
        if (!actualizarHotel) return res.status(404).send({ mensaje: 'Error al editar hotel'});
        return res.status(200).send({ actualizarHotel });
      }
    );
}

function editarHotelGerente  (req, res) {
  var hotelID = req.params.hotelID;
  var params = req.body;
  delete params.usuarioID;

    if (req.user.rol != 'ROL_GERENTE') return res.status(404).send({ message: 'NO TIENES PERMISOS PARA EDITAR ESTE HOTEL' });
    hotelModel.findByIdAndUpdate( hotelID, params,{ new: true },(err, actualizarHotel) => {
        if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
        if (!actualizarHotel) return res.status(404).send({ mensaje: 'Error al editar hotel'});
        return res.status(200).send({ actualizarHotel });
      }
    );
}

function eliminarHotel (req, res){
  const hotelID = req.params.hotelID;
  if (req.user.rol ===  'ROL_CLIENTE') return res.status(404).send({ mensaje:'No tienes permisos paa eliminar Hoteles'});
    hotelModel.findByIdAndDelete(hotelID, (err, eliminarHotel) => {
        if (err) return res.status(404).send({ mensaje:'Error en la peticion'});
        if (!eliminarHotel) return res.status(404).send({ mensaje: 'Error en la peticion' });
        return res.status(200).send({ mensaje:'Hotel Eliminado', eliminarHotel });
      }
    );
}

function obtenerHoteles (req,res){
  var params = req.body;
  if(req.user.rol === 'ROL_GERENTE'){
    hotelModel.find({usuarioID:req.user.sub},(err, encontrarHotel)=>{
      if(err) return res.status(404).send({mensaje:'Error en la peticion'})
      if(!encontrarHotel) return res.status(404).send({ mensaje:'No se han encontrado hoteles'})
      return res.status(200).send({encontrarHotel});
    })
  } else {
      hotelModel.find(params.usuarioID,(err, encontrarHotel)=>{
        if(err) return res.status(404).send({mensaje:'Error en la peticion'})
      if(!encontrarHotel) return res.status(404).send({ mensaje:'No se han encontrado hoteles'})
      return res.status(200).send({encontrarHotel});
      })
  }
}

function obtenerHotelGerente (req,res){
  if(req.user.rol != 'ROL_GERENTE') return res.status(404).send({mensaje:"No tienes permisos para ver este hotel"});
  hotelModel.find({usuarioID: req.user.sub}, (err,encontrarHotel)=>{
    if(err) return res.status(404).send({mensaje:'Error en la peticion'})
    if(!encontrarHotel) return res.status(404).send({ mensaje:'No se han encontrado hoteles'})
    return res.status(200).send({encontrarHotel});
  })
}

function obtenerEventoHotel (req,res){
  var hotelID = req.params.hotelID;
  eventoModel.find({hotelID:hotelID}, (err,encontrarEvento)=>{
    if(err) return res.status(404).send({mensaje:'Error en la peticion'})
    if(!encontrarEvento) return res.status(404).send({ mensaje:'No se han encontrado hoteles'})
    return res.status(200).send({encontrarEvento});
  })
}

function obtenerHotelesID(req, res){
  var hotelID = req.params.hotelID;
  hotelModel.findById(hotelID, (err, encontrarHotel) =>{
      if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
      if (!encontrarHotel) return res.status(404).send({ mensaje: 'Este Hotel no existe' });
      return res.status(200).send(encontrarHotel);
  })
}



module.exports = {
    registrarHotel,
    obtenerHoteles,
    obtenerHotelGerente,
    obtenerEventoHotel,
    editarHotel,
    eliminarHotel,
    editarHotelGerente,
    obtenerHotelesID
}