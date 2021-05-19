'use strict';

const Producto = require('../modelos/producto');

function getProducto(req, res){
    let idProducto = req.params.idProducto
    Producto.findById(idProducto, (error, producto) => {
        if(error) return res.status(500).send({message:`Error al obtnener el producto con el id ${idProducto}`})
        res.status(200).send({producto: producto})
    })
}

function getProductos(req, res){
    Producto.find({}, (error, producto) => {
        if(error) return res.status(500).send({message:`Error ${error} al realizar la peticion`})
        res.status(200).send({producto: producto})
        console.log({producto: producto});
    })
}

function updateProducto(req, res){
    let idProducto = req.params.idProducto
    let update = req.body
    Producto.findByIdAndUpdate(idProducto, update, (error, productoActualizado) => {
        if(error) return res.status(500).send({message:`Error al actualizar el producto con el id ${idProducto}`})
        res.status(200).send({message:`El producto con el id ${idProducto} ha sido actualizado con exito`})
    }) 
}

function agregarProducto(req, res){
    let producto = new Producto({
        precio: req.body.precio,
        tipo: req.body.tipo,
        marca: req.body.marca
    })
    producto.save((error, productoGuardado) => {
        if (error) {
            res.status(500).send({message:'Error al guardar el producto'})
        }
        res.status(200).send({
                            message:'Proudcto guardado con exito',
                            producto: productoGuardado
                            })
        console.log({producto: producto});
    })
}

function borrarProducto(req, res){
    let idProducto = req.params.idProducto
    Producto.findById(idProducto, (error, producto) => {
        if(error) return res.status(500).send({message:`Error al eliminar el producto con el id ${idProducto}`})
        producto.remove((error) => {
            if(error) return res.status(500).send({message:`Error al eliminar el producto con el id ${idProducto}`}) 
            res.status(200).send({message:`El producto con el id ${idProducto} ha sido eliminado con exito`})
        }) 
    })
}

module.exports = {
    getProducto,
    getProductos,
    updateProducto,
    agregarProducto,
    borrarProducto
}