'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    precio: Number,
    tipo:  String,
    marca: String
});

// Crear el modelo
module.exports = mongoose.model('Producto', ProductoSchema);

