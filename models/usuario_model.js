const mongoose = require("mongoose");

const validate_pass= [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/];

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: "El nombre es obligatorio", 
        minlength: [6, "El nombre debe tener como mínimo 6 caracteres"],
        maxlength: [16, "El nombre debe tener como máximo 16 caracteres"]     
    },
    email: {
        type: String,
        required: "El email es obligatorio",
        match: [/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, "Email no válido"]
    },
    password: {
        type: String,
        required: "La contraseña es obligatoria",
        match:[validate_pass, "La contraseña debe tener mínimo 8 caracteres, "]
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

