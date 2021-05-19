'use strict';

const mongoose = require('mongoose');
const Usuario = require('../modelos/usuario');
const servicio = require('../servicios/index')


function signUp(req, res) {
    const usuario = new Usuario({
        email: req.body.email,
        nombre: req.body.nombre,
        password: req.body.password
    })
    usuario.save((error)=>{
        if (error) return res.status(500).send({message:`Error al crear el usuario: ${error}`})
        return res.status(200).send({token: servicio.createToken(usuario)})
    })
}

function signIn(req, res) {
    Usuario.find({email: req.body.email}, (error, usuario)=>{
        if (error) return res.status(500).send({message:`Error al loguearse ${error}`})
        if(!usuario) return res.status(404).send({message:`No existe el usuario ${error}`})
        req.usuario = usuario
        res.status(200).send({
            message:`Usuario logueado con exito`, 
            token:servicio.createToken(usuario)})
    })
}

module.exports = {
    signIn,
    signUp
}