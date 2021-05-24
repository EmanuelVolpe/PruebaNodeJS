'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    tipo:  String,
    marca: String,
    precio: Number
});

module.exports = mongoose.model('Producto', ProductoSchema);

