'use strict'

const express = require("express");
const usuarioController = require("../controladores/usuario.controller")
const md_authenticated = require("../middlewares/authenticated");
var api = express.Router();


api.post('/registrarUsuario', usuarioController.registrarUsuario);
api.post('/registrarUsuarioGerente', md_authenticated.ensureAuth, usuarioController.registrarUsuarioGerente)
api.post('/usuarioLogin', usuarioController.usuarioLogin);
api.delete('/eliminarUsuario/:clienteID', md_authenticated.ensureAuth,usuarioController.eliminarUsuario);
api.put('/editarUsuario/:clienteID', md_authenticated.ensureAuth,usuarioController.editarUsuario);
api.get('/obtenerUsuarios', md_authenticated.ensureAuth,usuarioController.obtenerUsuarios);
api.get('/obtenerUsuariosID/:usuarioID', md_authenticated.ensureAuth, usuarioController.obtenerUsuariosID);


module.exports = api;   