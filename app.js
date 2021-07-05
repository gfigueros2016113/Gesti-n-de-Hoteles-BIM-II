'use strict'

// VARIABLES GLOBALES
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")

// IMPORTACION RUTAS
//const usuario_ruta = require("./src/rutas/usuario.rutas");
const usuariorutas = require('./src/rutas/usuario.rutas');
const tipoEventorutas = require('./src/rutas/tipoEvento.rutas');
const serviciorutas = require('./src/rutas/servicio.rutas');
const reservacionrutas = require('./src/rutas/reservacion.rutas');
const hotelrutas = require('./src/rutas/hotel.rutas');
const habitacionrutas = require('./src/rutas/habitacion.rutas');
const facturarutas = require('./src/rutas/factura.rutas');
const eventorutas = require('./src/rutas/evento.rutas');

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use('/api', usuariorutas, tipoEventorutas, hotelrutas, eventorutas, habitacionrutas,reservacionrutas, serviciorutas, facturarutas);

// EXPORTAR
module.exports = app;
