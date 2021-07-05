'use strict'

const express = require("express");
const habitacionController = require('../controladores/habitacion.controller')
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();

api.post('/registrarHabitacion/:hotelID',md_authenticated.ensureAuth,habitacionController.registrarHabitacion);
api.get('/obtenerHabitaciones/:hotelID', md_authenticated.ensureAuth, habitacionController.obtenerHabitaciones);


module.exports = api;   