'use strict'

const express = require("express");
const tipoEventoController = require("../controladores/tipoEvento.controller");
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();

api.post('/registrarTipoEvento', md_authenticated.ensureAuth, tipoEventoController.registrarTipoEvento);


module.exports = api;   