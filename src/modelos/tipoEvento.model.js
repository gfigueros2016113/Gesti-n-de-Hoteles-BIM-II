'use strict'
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tipoEventoSchema = Schema ({
    nombre: String,
})

module.exports = mongoose.model('tipoEvento', tipoEventoSchema);