'use strict'

const express = require("express");
const reservacionController = require('../controladores/reservacion.controller');
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();

api.post('/registroReservacion/:habitacionID/:usuarioID', md_authenticated.ensureAuth, reservacionController.registroReservacion);
api.put('/servicioReservacion/:reservacionID/:servicioID', reservacionController.servicioReservacion);


module.exports = api;   