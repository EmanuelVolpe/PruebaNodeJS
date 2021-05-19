'use strict';

const controladorProducto = require('../controladores/controladorProducto')
const controladorUsuario = require('../controladores/controladorUsuario')
const express = require('express')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/producto', controladorProducto.agregarProducto);
api.get('/producto/', controladorProducto.getProductos);
api.get('/producto/:idProducto', controladorProducto.getProducto)
api.put('/producto/:idProducto', controladorProducto.updateProducto);
api.delete('/producto/:idProducto', controladorProducto.borrarProducto);
api.get('/private', auth, (req, res) => {
    res.status(200).send({message:'tienes acceso'})
}) // aca falta el controlador
api.post('/singup', controladorUsuario.signUp)
api.post('/singin', controladorUsuario.signIn)


module.exports = api;