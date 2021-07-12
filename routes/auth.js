const express = require ("express");
const usuarioModel= require("../models/usuario_model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config")

//Validar que usuario y contraseña sean correctos
router.post("/", async (req, res) => {
    try{
        let email = req.body.email;
        const usuario = await usuarioModel.findOne({email: email});
        if(usuario){
            const validarPassword = bcrypt.compareSync(req.body.password, usuario.password);
            if(!validarPassword){res.status(400).json({msg: "Usuario o constraseña incorrecta"})}

            const jsonWT = jwt.sign({
                data: {id: usuario.id, nombre: usuario.nombre, email: usuario.email}
            },config.get("tokenConfig.SEED"), {expiresIn: config.get("tokenConfig.expiration")});
            res.json({
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
            }, 
            token: jsonWT
            });
        }
        else{res.json({msg: "Usuario o contraseña incorrecta."})}
    }
    catch(err){
        res.status(400).json({
            Error: err
        })
    }        
})



module.exports = router;