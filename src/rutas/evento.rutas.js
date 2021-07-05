'use strict'

const express = require("express");
const eventoController = require('../controladores/evento.controller')
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();

api.post('/registrarEvento/:hotelID/:tipoEventoID', md_authenticated.ensureAuth, eventoController.registrarEvento);


module.exports = api;   