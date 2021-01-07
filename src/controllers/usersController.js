const { render } = require("ejs");
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



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