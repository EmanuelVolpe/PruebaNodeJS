'use strict';

const controladorProducto = require('../controladores/controladorProducto')
const express = require('express')
const router = express.Router()


//router.post('/producto', controladorProducto.agregarProducto);
router.get('/producto/', controladorProducto.getProductos);
router.get('/producto/:idProducto', controladorProducto.getProducto)
/*
router.put('/producto/:idProducto', controladorProducto.updateProducto);
router.delete('/producto/:idProducto', controladorProducto.borrarProducto);
*/



router.post('/producto/', (req, res) => {
    res.render('formulario', {titulo: 'Agregar un Producto'})
});


/*router.get('/producto/', (req, res) => {
    res.render('productos', {titulo: 'Tabla de Productos'})
});*/




module.exports = router;