const express = require ("express");
const usuarioModel= require("../models/usuario_model");
const router = express.Router();



router.get('/', async (req, res) => {
   try{


    const usuario = await usuarioModel.find({});
   } 
    
    
    

    catch(e){  
        res.status(400).send({"Error": e.message});

    }
    
});




//Crear usuario
router.post("/", async (req, res) => {
   try{
    const usuario = new usuarioModel({
        nombre : req.body.nombre,
        email: req.body.email,
        password: req.body.password
    })

    await usuario.save();

    res.json({
        user: usuario
    })

   } catch(err){
        res.json({
            err: Error
        })
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
            user: updateUsuario
        })


    }
    catch(e){
        res.json({
            err: Error
        })
    }
})
  

module.exports=router;

