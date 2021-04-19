const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const nodemailer = require('nodemailer');

// requireing sequelize models
const db = require( '../database/models' );

// requireing .env
require('dotenv').config()


function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&?¡¿!';
    var charactersLength = characters.length;
    for (var i = 0; i < 30; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



const controladorUsuarios = {
    login: (req, res) => {
        res.render('./users/login', {
            loginData: {},
            errors: {},
            title: 'Login -'
        })
    },
    loginProcess: (req, res) => {
            
            db.Users.findOne({
                where: {
                    email: req.body.email,
                },
                paranoid:false 
            } 
            )
            .then(userToLogin => {
                if (userToLogin){
                    if(userToLogin.deleted_at) {
                        db.Users.restore({
                            where: {
                                email: req.body.email,
                            },
                            paranoid:false 
                        })
                        .then( () => {
                            if(bcrypt.compareSync(req.body.password, userToLogin.password)) {
                                req.session.user = userToLogin
                                res.locals.user = req.session.user;
                                if (req.body.remember) {
                                    res.cookie('user', userToLogin, {
                                        maxAge: 1000 * 60 * 60
                                    })
                                }
                            return res.redirect('/users/profile');  
                            }else{
                                let errormsg = "El usuario o la contraseña ingresados no son validos."
                                return res.render ('./users/login' , {errormsg,errors: {},loginData: {}, title: 'Login -'})
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.render('dbError')
                        })
                    } else { 
                        if(bcrypt.compareSync(req.body.password, userToLogin.password)) {
                                req.session.user = userToLogin
                                res.locals.user = req.session.user;
                                if (req.body.remember) {
                                    res.cookie('user', userToLogin, {
                                        maxAge: 1000 * 60 * 60
                                    })
                                }
                                
                            return res.redirect('/users/profile');  
                            }
                            else{
                                let errormsg = "El usuario o la contraseña ingresados no son validos."
                                
                                return res.render ('./users/login' , {errormsg,errors: {},loginData: {}, title: 'Login -'})
                            }
                    }
                }else{
                    let errormsg = "El usuario o la contraseña ingresados no son validos."
                                
                    return res.render ('./users/login' , {errormsg,errors: {},loginData: {}, title: 'Login -'})

                }
                
            })
            .catch(err => {
                console.log(err);
                res.render('dbError')
            })
        
         
    },
    register: (req, res) => {
        res.render('./users/register', {
            registerData: {},
            errors: [],
            title: 'Registro -'
        })
    },
    profile: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.session.user.email
            }
        })
        .then( user => {
            let errors
            res.render('./users/profile', {user, errors, title: 'Perfil -'})
        })
        .catch(err => {
            console.log(err);
            res.render('dbError')
        })
    },
    saveUser: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            db.Users.findOne({
                where: {
                    email: req.body.email
                },
                paranoid:false 
            })
            .then( resultado => {
                if(resultado == null ) {
                    db.Users.create({   
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        
                    })
                    .then( () => {
                        req.session.user = {   
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10),
                        }
                        res.locals.user = req.session.user
                        return res.redirect('/users/profile')
                    })
                    .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
                } else {
                    repitedUser = req.body.email
                    return res.render('./users/register', {
                        registerData: {},
                        errors: [],
                        title: 'Registro -',
                        repitedUser
                    })
                }
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        } else {
            return res.render('./users/register', {
                errors: errors.mapped(),
                registerData: {
                    ...req.body,
                },
                title: 'Register -'
            })
            
        }
    },
    profileImage: (req, res) => {
        db.Users.update({
            profile_image: "/images/users/" + req.files[0].filename
        }, {
            where: {
                email:  res.locals.user.email
            }
        })
        .then( resultado => {
            res.redirect('/users/profile')
            })
        .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        
    },
    editUser: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
                db.Users.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                }, {
                    where: {
                        id: req.session.id
                    }
                })
                .then( resultado => {
                    res.locals.user.first_name = req.body.first_name
                    res.locals.user.last_name = req.body.last_name
                    res.locals.user.email = req.body.email
                    res.redirect('/users/profile')
                    })
                .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        } else {
            console.log(errors);
            db.Users.findOne({
                where: {
                    email: req.session.user.email
                }
            })
            .then( user => {
                return res.render('./users/profile', {
                    user,
                    errors: errors.mapped(),
                    title: 'Perfil -'
                })
            })
            
        }
    },
    changePassword: (req,res) => {
        let password_errors = validationResult(req)
        if (password_errors.isEmpty()) {
            console.log(req.body);
            db.Users.update({
                password: bcrypt.hashSync(req.body.password, 10),
            }, {
                where: {
                    id: req.session.user.id
                }
            })
            .then( userUpdate => {
                console.log(userUpdate);
                return res.redirect('/users/profile')
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        } else {
            db.Users.findOne({
                where: {
                    email: req.session.user.email
                }
            })
            .then( user => {
                return res.render('./users/profile', {
                    user,
                    password_errors: password_errors.mapped(),
                    title: 'Perfil -'
                })
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        }
    },
    newPassword: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.body.email
            },
            paranoid:false 
        })
        .then(userEmail => {
            if(userEmail) {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_MBZ,
                        pass: process.env.PASSWORD_EMAIL,
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
            
                let randomPassword = makeid()
            
                let info = transporter.sendMail({
                    from: 'motorbikezone007@gmail.com',
                    to: req.body.email,
                    subject: 'Cambio de contraseña',
                    text: 'Su nueva contraseña es ' + randomPassword + ' actualizela al reingresar',
                });
            
                console.log('Message sent: %s', info.messageId);
            
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
                db.Users.update({
                    password: bcrypt.hashSync(randomPassword, 10)
                }, {
                    where: {
                        email: req.body.email
                    },
                    paranoid:false 
                })
                .then(()=> {
                    let mensajeOk = 'Se ha enviado un email a la casilla ' + req.body.email + '. Por favor siga los pasos indicados en el mismo para volver a ingresar.'
                    res.render('./users/login', {mensajeOk, title: 'Login -', errors: {}})
                })
                .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
                
            } else {
                let mensajeErr = 'El email ingresado no se encuentra registrado, por favor registrese.'
                res.render('./users/login', {mensajeErr, title: 'Login -', errors: {}})
            }
        })
        .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })

        
    },
    deleteUser: (req, res) => {
        db.Users.destroy({
            where: {
                id: res.locals.user.id
            }
        })
        .then( userDestroy => {
            req.session.destroy();
            res.clearCookie('user');
            res.redirect('/users/login') 
        })
        .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('user');
        res.redirect('/users/login')
    }
}


module.exports = controladorUsuarios;