'use strict';

const servicio = require('../servicios/index')

function isAuth(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({message:'No tiene autorizacion'})
    }
    const token = req.headers.authorization.split(' ')[1]

    servicio.decodeToken(token)
    .then(response => {
        req.usuario = response
        next()
    })
    .catch(response => {
        res.status(response.status)
    })
}

module.exports = isAuth;