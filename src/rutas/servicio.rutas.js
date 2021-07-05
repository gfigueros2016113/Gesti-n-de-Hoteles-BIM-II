'use strict'

const express = require("express");
const servicioController = require('../controladores/servicio.controller');
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();

api.post('/registrarServicio/:hotelID', md_authenticated.ensureAuth, servicioController.registrarServicio);


module.exports = api;   