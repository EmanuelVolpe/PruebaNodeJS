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
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
    producto.save((error, productoGuarado) => {
        if (error) {
            res.status(500).send({message:'Error al guardar el producto'})
        }
        res.status(200).send({
                            message:'Proudcto guardado con exito',
                            producto: productoGuarado
                            })
    })
});


/*app.get('/api/producto/', (req, res) => {
    res.status(200).send({ 'Productos': '[application/json]'})
})
  
app.get('/api/producto/:idProducto', (req, res) => {
    res.send(`Pagina del producto: ${req.params.idProducto}`)
})

app.put('/api/producto/:idProducto', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/api/producto/:idProducto', function (req, res) {
    res.send('Got a DELETE request at /user');
});*/



app.listen(port, () => {
    console.log(`App de Manu corriendo en http://localhost:${port}`)
})
