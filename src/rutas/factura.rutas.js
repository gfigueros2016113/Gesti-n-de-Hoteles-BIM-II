'use strict'

const express = require("express");
const facturaController = require('../controladores/factura.controller');
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();

api.post('/factura/:reservacionID', md_authenticated.ensureAuth, facturaController.factura);


module.exports = api;   