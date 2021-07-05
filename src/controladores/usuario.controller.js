'use strict'

var usuarioModel = require('../modelos/usuario.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../servicios/jwt');

function registrarUsuario(req,res){
    var user = new usuarioModel();
    var params = req.body;

    if(params.nombre && params.apellido && params.usuario && params.password && params.correo && params.telefono){
        usuarioModel.findOne({$or:[{ usuario: params.usuario}, {correo : params.correo}]},(err,encontrarUsuario)=>{
            if(err){
                res.status(404).send({ message : 'Error en la peticion'});
            } else if (encontrarUsuario){
                res.send({message: 'El campo usuario ya existe intenta con: User007'});
            } else {             
                user.nombre = params.nombre;
                user.apellido= params.apellido;
                user.usuario= params.usuario;
                user.correo= params.correo;
                user.telefono= params.telefono;
                user.rol='ROL_CLIENTE';

                bcrypt.hash(params.password, null, null, (err, passwordEncriptada)=>{
                    if(err){
                        res.status(404).send({message: 'Error al encriptar contraseña'});
                    }else if(passwordEncriptada){
                        user.password = passwordEncriptada;
                        user.save((err, usuarioGuardado)=>{
                            if(err){
                                res.status(404).send({message: 'Error al guardar usuario'});
                            }else if(usuarioGuardado){
                                res.send({message: 'Usuario creado', user: usuarioGuardado});
                            }else{
                                res.status(404).send({message: 'Error en la peticion'});
                            }
                        });
                    }else{
                        res.status(404).send({message: 'Error en la peticion'});
                    }
                });
            }
        }) 
        
    } else {
        res.send({ message : 'Ingrese todo los datos necesarios'});
    }
} 

function registrarUsuarioGerente(req,res){
    var user = new usuarioModel();
    var params = req.body;
    if(req.user.rol === 'ROL_ADMIN'){
    if(params.nombre && params.apellido && params.usuario && params.password && params.correo && params.telefono){
        usuarioModel.findOne({$or:[{ usuario: params.usuario}, {correo : params.correo}]},(err,encontrarUsuario)=>{
            if(err){
               return res.status(404).send({ message : 'Error en la peticion'});
            } else if (encontrarUsuario){
               return res.status(404).send({message: 'El campo usuario ya existe intenta con: User007'});
            } else {             
                user.nombre = params.nombre;
                user.apellido= params.apellido;
                user.usuario= params.usuario;
                user.correo= params.correo;
                user.telefono= params.telefono;
                user.rol= 'ROL_GERENTE';
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada)=>{
                    if(err){
                        return res.status(404).send({message: 'Error al encriptar contraseña'});
                    }else if(passwordEncriptada){
                        user.password = passwordEncriptada;
                        user.save((err, usuarioGuardado)=>{
                            if(err){
                                return res.status(404).send({message: 'Error al guardar usuario'});
                            }else if(usuarioGuardado){
                                return res.status(200).send({message: 'Usuario creado', user: usuarioGuardado});
                            }else{
                               return  res.status(404).send({message: 'Error en la peticion'});
                            }
                        });
                    }else{
                        return res.status(404).send({message: 'Error en la peticion'});
                    }
                });
            }
        }) 
        
    } else {
        return res.status(200).send({ message : 'Ingrese todo los datos necesarios'});
    }
}else{
    return res.status(200).send({message: 'No tienes permisos para realizar esta peticion'});
}

}   

function usuarioLogin (req, res)  {
    var params = req.body;
    usuarioModel.findOne({ usuario: params.usuario }, (err, encontrarUsuario) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición de Login' });
        if (encontrarUsuario) {
            bcrypt.compare(params.password, encontrarUsuario.password, (err, passwordCorrecta) => {
                if (passwordCorrecta) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(encontrarUsuario)
                        });
                    } else {
                        encontrarUsuario.password = undefined;
                        return res.status(200).send({ encontrarUsuario })
                    }
                    } else {
                        return res.status(404).send({ mensaje: 'El usuario no se ha encontrado' })
                  }
            })
        } else {
            return res.status(404).send({ mensaje: 'El usuario no ha podido ingresar' })
        }
    })
}

function editarUsuario (req, res){
    var clienteID = req.params.clienteID;
    var params = req.body;
    delete params.password; 
    if (req.user.rol === 'ROL_ADMIN') {
        usuarioModel.findByIdAndUpdate(clienteID, params, { new: true }, (err, actualizarPerfil) => {
        if (err) return res.status(404).send({ mensaje: 'Error en la peticion editar perfil' });
        if (!actualizarPerfil) return res.status(404).send({ mensaje: 'No se ha podido actualizar este Perfil' });
        return res.status(200).send({ actualizarPerfil });
    })
    } else {
        return res.status(404).send({ mensaje: 'No tienes permisos para editar este Perfil'})
    }
}

function eliminarUsuario  (req, res){
    var clienteID = req.params.clienteID;
    if (req.user.rol === 'ROL_ADMIN'){
    usuarioModel.findByIdAndDelete(clienteID, (err, eliminarCuenta) => {
        if(err) return res.status(404).send({ mensaje: 'Error en la periticion eliminar Cuenta'});
        if(!eliminarCuenta) return res.status(404).send({ mensaje: 'No se ha podido eliminar la Cuenta'});
        return res.status(200).send({ mensaje: 'Cuenta Eliminada'})
    })
    } else {
        return res.status(404).send({mensaje: 'no tienes permisos para eliminar cuenta'})
    }
}

function obtenerUsuarios (req, res){
    if(req.user.rol != 'ROL_ADMIN') return res.status(404).send({mensaje: 'No tienes permisos para ver los usuarios'});
    usuarioModel.find((err,encontrarUsuario)=>{
        if(err) return res.status(404).send({ mensaje: 'Error en la peticion'});
        if(!encontrarUsuario) return res.status(404).send({ mensaje: 'Error en la peticion'});
        return res.status(200).send({ mensaje:'Usuarios Registrados', encontrarUsuario})
    })
}

function obtenerUsuariosID(req, res){
    var usuarioID = req.params.usuarioID;
    if(req.user.rol != 'ROL_ADMIN') return res.status(404).send({mensaje: 'No tienes permisos para buscar usuarios por ID'});
    usuarioModel.findById(usuarioID, (err, encontrarUsuario) =>{
        if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
        if (!encontrarUsuario) return res.status(404).send({ mensaje: 'Este Usuario no existe' });
        return res.status(200).send(encontrarUsuario);
    })
}

module.exports = {
    registrarUsuario,
    usuarioLogin,
    editarUsuario,
    eliminarUsuario,
    registrarUsuarioGerente,
    obtenerUsuarios,
    obtenerUsuariosID
}