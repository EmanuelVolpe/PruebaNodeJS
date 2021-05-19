'use strict';

const controladorProducto = require('../controladores/controladorProducto')
const express = require('express')
const api = express.Router()

api.post('/producto', controladorProducto.agregarProducto);
api.get('/producto/', controladorProducto.getProductos);
api.get('/producto/:idProducto', controladorProducto.getProducto)
api.put('/producto/:idProducto', controladorProducto.updateProducto);
api.delete('/producto/:idProducto', controladorProducto.borrarProducto);


module.exports = api;