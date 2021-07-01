const express = require ("express");
const cursoModel= require("../models/curso_model");
const router = express.Router();



//Peticiones

//Listado de cursos activos
router.get("/", async (req,res) => {
    try{
        const cursosActivos = await cursoModel.find({estado: true});
        res.json(cursosActivos);
    }
    catch(err){
        res.status(400).json({error: err});
    }
})


//Crea curso
router.post("/", async (req,res) => {
    try{
        const curso = new cursoModel({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion
        });
        await curso.save();
        res.json({
            curso: curso
        })
        
    }
    catch(err){
        res.status(400).json({error: err});
    }
    
});
//Editar curso
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const updateCurso = await cursoModel.findOneAndUpdate(id,{
            $set: {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion
            }
        }, {new: true})
        res.json({
            curso: updateCurso
        })
    }
    catch(err){
        res.status(400).json({error: err});
    }
});

//Cambiar estado del curso
router.delete("/:id", async (req, res) => {
    try{
        const id= req.params.id;
        const deleteCurso = await cursoModel.findOneAndUpdate(id,{
            $set: {
                estado: false
            }
        }, {new: true});
        res.json({
            curso: deleteCurso
        })


    }
    catch(err){
        res.status(400).json({error:err});
    }
})

module.exports = router;