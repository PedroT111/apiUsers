const express = require("express");
const mongoose = require ("mongoose");
const app = express();
const usuarios = require("./routes/usuarios");
const cursos = require("./routes/cursos")
const auth = require("./routes/auth");
const config= require("config");


//Conexiòn a la base de datos
mongoose.connect(config.get("dbConfig.HOST"), {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {console.log("Conectado a la bd")})
    .catch((err) => console.log("No se pudo conectar a la bd",err))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use("/api/usuarios", usuarios);
app.use("/api/cursos", cursos);
app.use("/api/auth", auth);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Escuchando desde", port)

})
