'use strict'
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var servicioSchema = Schema ({
    nombre: String,
    precio: Number,
    hotelID: {type: Schema.Types.ObjectId, ref: 'hotel'}
})

module.exports = mongoose.model('servicio', servicioSchema);