const { render } = require("ejs");

const controladorUsuarios = {
    login: (req , res) =>{
        res.render ("./users/login")
    },
    register: (req , res) =>{
        res.render ("./users/register")
    },
    newPassword: (req, res) => {
        res.render('./users/newPassword')
    },
}

module.exports = controladorUsuarios;