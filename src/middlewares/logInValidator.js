var {check} = require ('express-validator')



module.exports = 
    [check('email').isEmail().withMessage('El email debe ser valido'),

    check('password').isLength({
        min: 8
    }).withMessage('La contraseña debe tener 8 caracteres como minimo.'),
]