'Use strict'
const mongoose = require("mongoose");
const app = require('./app');
const usuarioModel = require('./src/modelos/usuario.model');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/GestionHotelesDB', { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    
    var nombre= 'Gabriel';
    var apellido= 'Figueros';
    var usuario= 'ADMIN';
    var password= '123456';
    var correo= 'admin@gmail.com';
    var telefono= '32307740';
    var rol= 'ROL_ADMIN';
    
    var user = new usuarioModel();

    user.nombre = nombre;
    user.apellido= apellido;
    user.usuario= usuario;
    user.correo=correo;
    user.telefono=telefono;
    user.rol=rol;

    usuarioModel.find({ usuario: user.usuario }).exec((err, encontrarUsuario) => {
        //Validar que ya existe el usuario inicial
         if (encontrarUsuario && encontrarUsuario.length == 1) {
             return console.log('Este usuario ya esta en existencia');
         } else {
             bcrypt.hash(password, null, null, (err, passwordEncriptada) => {
                 user.password = passwordEncriptada;
                 //Al iniciar el proyecto se crea un usuario ADMIN 
                 user.save((err, encontrarUsuario) => {
                     if (err) return res.status(500).send({ mensaje: 'El usuario no ha podido guardarse' })
                     if (encontrarUsuario) {
                         return console.log(encontrarUsuario);
                     } else {
                         return res.status(500).send({ mensaje: 'No se ha podido registrar el Usuario' })
                     }
                 })
             })
         }
     })

    app.listen(3000, function(){
        console.log('El servidor esta corriendo en el puerto: 3000');
       })

}).catch(err => console.log(err))

