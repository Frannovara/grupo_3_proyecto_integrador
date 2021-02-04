const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const nodemailer = require('nodemailer');

// requireing sequelize models
const db = require( '../database/models' );

// requireing .env
require('dotenv').config()


const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&?¡¿!';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



const controladorUsuarios = {
    login: (req, res) => {
        res.render('./users/login', {
            loginData: {},
            errors: []
        })
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            db.Users.findOne({
                where: {
                    email: req.body.email,
                },
                paranoid:false 
            } 
            )
            .then(userToLogin => {
                if(userToLogin.deleted_at) {
                    db.Users.restore({
                        where: {
                            email: req.body.email,
                        },
                        paranoid:false 
                    })
                    .then( userRestored => {
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
                }
            })
            .catch(err => {
                console.log(err)
                
            })
        } else {
            console.log(errors);
            return res.render('./users/login', {
                errors: errors.mapped(),
                loginData: {
                    ...req.body,
                    password: ''
                }
            });
        }
         
    },
    register: (req, res) => {
        res.render('./users/register', {
            registerData: {},
            errors: []
        })
    },
    profile: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.session.user.email
            }
        })
        .then( user => {
            res.render('./users/profile', {user})
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
                    .then( result => {
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
                        return err            
                    }) 
                } else {
                    repitedUser = req.body.email
                    return res.redirect('register');
                }
            })
            .catch(err => {
                return err            
            })
        } else {
            console.log('encontró errores al validar');
            console.log(errors);
            return res.render('./users/register', {
                errors: errors.mapped(),
                registerData: {
                    ...req.body,
                }
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
            res.send(err)
        })
        
    },
    editUser: (req, res) => {
        if (req.body.password == '') {
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
                res.send(err)
            })
        } else {
            db.Users.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
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
                console.log(err)
            })
        }
    },
    newPassword: (req, res) => {
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
            }
        })
        res.redirect('/users/login')
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
            console.log(err)
        })
        
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('user');
        res.redirect('/users/login')
    }
}


module.exports = controladorUsuarios;