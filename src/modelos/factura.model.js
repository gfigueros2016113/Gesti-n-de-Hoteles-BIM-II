'use strict'
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var facturaSchema = Schema ({
    total: Number,
    tiempo: String,
    ReservacionID: {type: Schema.Types.ObjectId, ref: 'reservacion'}
})

module.exports = mongoose.model('factura', facturaSchema);