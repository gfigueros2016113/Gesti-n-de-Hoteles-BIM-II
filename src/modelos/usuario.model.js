'use strict'
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    password: String,
    correo: String,
    telefono: String,
    rol: String,
})

module.exports = mongoose.model('usuario', UsuarioSchema);