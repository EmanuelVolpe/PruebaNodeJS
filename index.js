'use strict';

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const Producto = require('./modelos/producto')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//CONEXION A LA BASE DE DATOS
const mongoose = require('mongoose');
const user = "manu";
const pass = "manu";
const dbname = "inventario";
const uri = `mongodb+srv://${user}:${pass}@manucluster.c1h7e.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log('conectado a mongodb')) 
  .catch((e) => console.log('error de conexión', e))


app.post('/api/producto', (req, res) => {
    //console.log(req.body)
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
    })
    console.log({producto: producto});
});

app.get('/api/producto/', (req, res) => {
    Producto.find({}, (error, producto)=>{
        if(error) return res.status(500).send({message:`Error ${error} al realizar la peticion`})
        res.status(200).send({producto: producto})
    })
})
  
app.get('/api/producto/:idProducto', (req, res) => {
    let idProducto = req.params.idProducto
    Producto.findById(idProducto, (error, producto) => {
        if(error) return res.status(500).send({message:`Error al obtnener el producto con el id ${idProducto}`})
        res.status(200).send({producto: producto})
    })
})

app.put('/api/producto/:idProducto', (req, res) => {
    let idProducto = req.params.idProducto
    let update = req.body
    Producto.findByIdAndUpdate(idProducto, update, (error, productoActualizado) => {
        if(error) return res.status(500).send({message:`Error al actualizar el producto con el id ${idProducto}`})
        res.status(200).send({message:`El producto con el id ${idProducto} ha sido actualizado con exito`})
    }) 
});

app.delete('/api/producto/:idProducto', (req, res) => {
    let idProducto = req.params.idProducto
    Producto.findById(idProducto, (error, producto) => {
        if(error) return res.status(500).send({message:`Error al eliminar el producto con el id ${idProducto}`})
        producto.remove((error) => {
            if(error) return res.status(500).send({message:`Error al eliminar el producto con el id ${idProducto}`}) 
            res.status(200).send({message:`El producto con el id ${idProducto} ha sido eliminado con exito`})
        }) 
    })
});



app.listen(port, () => {
    console.log(`App de Manu corriendo en http://localhost:${port}`)
})
