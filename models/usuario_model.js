const mongoose = require("mongoose");



const usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: "El nombre es obligatorio",     
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"], 
    },
    password: {
        type: String,
        required: "La contraseña es obligatoria",
        
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    }

});

const usuarioModel = mongoose.model("Usuario", usuarioSchema);

module.exports = usuarioModel;

