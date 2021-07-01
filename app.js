const express = require("express");
const mongoose = require ("mongoose");
const app = express();
const usuarios = require("./routes/usuarios");


//Conexiòn a la base de datos
mongoose.connect("mongodb://localhost:27017/prueba", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {console.log("Conectado a la bd")})
    .catch((err) => console.log("No se pudo conectar a la bd",err))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use("/api/usuarios", usuarios);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Escuchando desde", port)

})
