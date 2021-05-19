'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuarioSchema = new Schema({
    email:{type: String, unique: true, lowercase: true},
    nombre:String,
    password:{type: String, select:false},
    signUpDate:{type:Date, default: Date.now()},
    lastLogin:Date
});

UsuarioSchema.pre('save', (next) => {
    let user = this
    //if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (error, salt) => {
        if(error) return next(error);
        bcrypt.hash(user.password, salt, null, (error, hash) => {
            if(error) return next(error)
            user.password = hash
            next();
        })
    })
})

module.exports = mongoose.model('Usuario', UsuarioSchema);