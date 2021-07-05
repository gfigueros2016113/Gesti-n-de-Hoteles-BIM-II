'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HotelSchema = Schema({

nombre: String,
direccion: String,
usuarioID: {type: Schema.Types.ObjectId, ref: 'usuario'}

});
module.exports = mongoose.model('hotel',HotelSchema);