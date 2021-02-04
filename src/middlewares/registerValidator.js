var {check} = require ('express-validator')

module.exports = {
    register: [
    check('first_name').isLength({min:1}).withMessage('Este campo es obligatorio'),
    check('last_name').isLength({min:1}).withMessage('Este campo es obligatorio'),
    check('email').isLength({min:1}).withMessage('Este campo es obligatorio').isEmail().withMessage('No es un email válido'),
    check('password').isLength({min:1}).withMessage('Este campo es obligatorio').isLength( {
        min:8
    }).withMessage('La contraseña debe tener 8 caracteres como mínimo y al menos una minúscula, una mayúscula y un número')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('La contraseña debe tener 8 caracteres como mínimo y al menos una minúscula, una mayúscula y un número'),
    check('re_password').isLength({min:1}).withMessage('Este campo es obligatorio')
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            // trow error if passwords do not match
            throw new Error("Las contraseñas deben coincidir");
        } else {
            return value;
        }
    })
  ],
  edit: [
    check('first_name').isLength({min:1}).withMessage('Este campo es obligatorio'),
    check('last_name').isLength({min:1}).withMessage('Este campo es obligatorio'),
    check('email').isLength({min:1}).withMessage('Este campo es obligatorio').isEmail().withMessage('No es un email válido'),
    
  ],
  changePassword: [
    check('password').isLength( {
        min:8
    }).withMessage('La contraseña debe tener 8 caracteres como mínimo y al menos una minúscula, una mayúscula y un número')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('La contraseña debe tener 8 caracteres como mínimo y al menos una minúscula, una mayúscula y un número'),
    check('re_password').isLength({min:1}).withMessage('Este campo es obligatorio')
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            // trow error if passwords do not match
            throw new Error("Las contraseñas deben coincidir");
        } else {
            return value;
        }
    })
  ]
}