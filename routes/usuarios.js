const express = require ("express");
const usuarioModel= require("../models/usuario_model");
const router = express.Router();
const bcrypt = require("bcrypt");





//Mostrar usuarios activos
router.get('/', async (req, res) => {
   try{
        const usuariosActivos = await usuarioModel.find({"estado": true}).select({nombre:1, email:1});

        res.json({
            usuariosActivos
        });
   }
    catch(err){  
        res.status(400).json({Error: err});

    }
    
});




//Crear usuario
router.post("/", async (req, res) => {
   try{
       let email = req.body.email;
        const usuario = new usuarioModel({
        nombre : req.body.nombre,
        email: email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    //Validar que no haya dos usuarios con el mismo email
    const user = await usuarioModel.findOne({email: email});
    if(user){res.status(404).json({error: "Ya existe una cuenta asociada a ese email"})}

     await usuario.save(function(err){
         if(err){
             res.status(404).json({error: err.message})
        }
    });
    res.json({
        nombre: usuario.nombre,
        email: usuario.email
                
    })   
    
    }
    catch(err){
        res.status(400).json({Error: err})
   }
  
})

//Modificar usuario
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const updateUsuario = await usuarioModel.findOneAndUpdate(id, {
            $set:{
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password
            }
        }, {new: true});

        res.json({
            nombre: updateUsuario.nombre,
            email: updateUsuario.email
        })


    }
    catch(err){
        res.status(400).json({Error: err});
    }
});

//Desactivar usuario
router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deleteUsuario = await usuarioModel.findOneAndUpdate(id,{
            $set: {
                estado: false
            }
        },{new: true})
        res.json({
            nombre: deleteUsuario.nombre,
            email: deleteUsuario.email
        })

    }
    catch(err){
        res.status(400).json({Error : err});          
        
    }
})
  

module.exports=router;

