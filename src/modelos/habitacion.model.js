'use strict'
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var habitacionSchema = Schema ({
    nombre: String,
    precio: Number,
    hotelID: {type: Schema.Types.ObjectId, ref: 'hotel'}
})

module.exports = mongoose.model('habitacion', habitacionSchema);