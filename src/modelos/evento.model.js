'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = Schema({

nombre: String,
capacidad: Number,
fecha: Date,
tipoEventoID: {type: Schema.Types.ObjectId, ref: 'tipoEvento'},
hotelID: {type: Schema.Types.ObjectId, ref: 'hotel'}

});
module.exports = mongoose.model('evento',EventoSchema);