const mongoose = require("mongoose");


const cursoSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: "El titulo es obligatorio"   
    },
    descripcion: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    },
    alumnos: {
        type: Number,
        default: 0
    },
    califica: {
        type: Number,
        default: 0
    }

});

const cursoModel = mongoose.model("Curso", cursoSchema);

module.exports = cursoModel;

