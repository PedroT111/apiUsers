const { validationResult, check } = require('express-validator');

exports.validarRegistro = () => {
    return [
      check('nombre')
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .not()
        .isLength({min: 5}, {max:15})
        .withMessage("El nombre debe tener mínimo 5 caratceres y máximo 16"),
      check("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener como mínimo 8 caracteres"),
      check("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .custom((valor) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(valor))
        .withMessage("El email no es válido")

    ]
  }