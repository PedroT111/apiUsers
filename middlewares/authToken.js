const jwt = require("jsonwebtoken");
const config = require("config");


//Middleware para verificar proteger las rutas con el token

let authToken = (req, res, next) => {
    let token = req.get("Auth");
    jwt.verify(token, config.get("tokenConfig.SEED"), (error, decoded) => {
        if(error){return res.status(401).json({error})}
        
        req.usuario = decoded.usuario;

        next();
    })
}

module.exports = authToken;