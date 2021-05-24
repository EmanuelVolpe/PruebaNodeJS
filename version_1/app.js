'use strict';

const express = require('express')
const app = express()
const router = require('./rutas/router')
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api', router)
app.use(express.static(__dirname +'/public'));

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views") //APARENTEMENTE LA CARPETA SE TIENE QUE LLAMAR SI O SI "VIEWS"


module.exports = app;

