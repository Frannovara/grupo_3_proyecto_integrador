const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {
    validationResult
} = require('express-validator');
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

// Función que envía un mail para regenerar la contraseña
async function newPass(req) {

    let testAcount = await nodemailer.createTestAccount();

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

    let info = await transporter.sendMail({
        from: 'motorbikezone007@gmail.com',
        to: req.body.email,
        subject: 'Cambio de contraseña',
        text: 'Su nueva contraseña es ' + randomPassword + ' actualizela al reingresar',
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    users.forEach((user) => {
        if (user.email == req.body.email) {
            user.password = bcrypt.hashSync(randomPassword, 10)
            const usersJson = JSON.stringify(users)
            fs.writeFileSync(usersFilePath, usersJson)
        }
    })
}

const saveUser = function (req) {
    let newUser = {
        id: Date.now(),
        ...req.body,
        image: "/images/users/default.png",
        category: 'user'
    };


    delete newUser.terms
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    users.push(newUser);
    let usersJSON = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usersJSON)
    console.log(newUser)
}
const setImage = (req) => {
    users.forEach((user) => {
        if (user.id == req.params.id) {
            user.image = '/images/users/' + req.files[0].filename
            const usersJson = JSON.stringify(users)
            fs.writeFileSync(usersFilePath, usersJson)
            return user.id
        }
    })

}

const editUser = (req) => {
    users.forEach((user) => {
        if (user.id == req.params.id) {
            // product = { ...product, ...req.body, image: req.files[0].filename }
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.email = req.body.email
            if (req.body.password != '') {
                user.password = bcrypt.hashSync(req.body.password, 10)
            };
            user.category = req.body.category
            const usersJson = JSON.stringify(users)
            fs.writeFileSync(usersFilePath, usersJson)
        }
    })
}

const deleteUser = (req) => {
    const usersNotDeleted = users.filter((user) => user.id != req.params.id)
    const usersJson = JSON.stringify(usersNotDeleted)
    fs.writeFileSync(usersFilePath, usersJson)
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
            let userToLogin = {
                ...users.find(user => user.email === req.body.email)
            }
            if (userToLogin != undefined) {
                if (bcrypt.compareSync(req.body.password, userToLogin.password)) {
                    delete userToLogin.password;
                    req.session.user = userToLogin
                    if (req.body.remember) {
                        res.cookie('user', userToLogin, {
                            maxAge: 1000 * 60 * 60
                        })
                    }
                    res.locals.usuario = req.session.user
                    res.redirect('/users/profile'); //como sabe que perfil es???
                }
            }
        }
        res.render('./users/login', {
            errors: errors.mapped(),
            loginData: {
                ...req.body,
                password: ''
            }
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
    register: (req, res) => {
        res.render('./users/register')
    },
    profile: (req, res) => {
        const user = req.session.user
        res.render('./users/profile', {
            user
        })
    },
    saveUser: (req, res) => {
        saveUser(req)
        res.redirect('/users/login')
    },
    profileImage: (req, res) => {
        setImage(req)
        res.redirect('/')
    },
    editUser: (req, res) => {
        editUser(req)
        res.redirect('/users/profile')
    },
    newPassword: (req, res) => {
        newPass(req)
        res.redirect('/users/login')
    },
    deleteUser: (req, res) => {
        let i = deleteUser(req)
        res.redirect('/')
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('user');
        res.redirect('/')
    }
}


module.exports = controladorUsuarios;