'use strict'

const express = require("express");
const hotelController = require("../controladores/hotel.controller");
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();

api.post('/registrarHotel/:usuarioID', md_authenticated.ensureAuth, hotelController.registrarHotel);
api.get('/obtenerHoteles',md_authenticated.ensureAuth,hotelController.obtenerHoteles);
api.get('/obtenerHotelGerente',md_authenticated.ensureAuth,hotelController.obtenerHotelGerente);
api.get('/obtenerEventoHotel/:hotelID',md_authenticated.ensureAuth,hotelController.obtenerEventoHotel);
api.put('/editarHotel/:hotelID',md_authenticated.ensureAuth,hotelController.editarHotel);
api.delete('/eliminarHotel/:hotelID', md_authenticated.ensureAuth,hotelController.eliminarHotel);
api.put('/editarHotelGerente/:hotelID',md_authenticated.ensureAuth, hotelController.editarHotelGerente);
api.get('/obtenerHotelesID/:hotelID',md_authenticated.ensureAuth, hotelController.obtenerHotelesID);

module.exports = api;   