'use strict';

const app = require('./app')
const config = require('./config')

//CONEXION A LA BASE DE DATOS
const mongoose = require('mongoose');
mongoose.connect(config.uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log('conectado a mongodb')) 
  .catch((e) => console.log('error de conexión', e))


app.listen(config.port, () => {
    console.log(`App de Manu corriendo en http://localhost:${config.port}`)
})
