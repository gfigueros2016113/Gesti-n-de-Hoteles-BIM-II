'use strict'
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reservacionSchema = Schema ({
    checkIn: Date,
    checkOut: Date,
    estado: String,
    usuarioID: {type: Schema.Types.ObjectId, ref: 'usuario'},
    habitacionID: {type: Schema.Types.ObjectId, ref: 'habitacion'},
    servicioID: [{type: Schema.Types.ObjectId, ref: 'servicio'}]
})

module.exports = mongoose.model('reservacion', reservacionSchema);