var {check} = require ('express-validator')



module.exports = [check('email').isEmail().withMessage('El email no se encuentra registrado'),
        check('password').isLength({
            min: 8
        }).withMessage('La contraseña debe tener 8 caracteres como minimo.'),
    ]
    