const { render } = require("ejs");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {  validationResult  } = require('express-validator');


const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const saveUser = function(req) {
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

const editUser =  (req) => {
	users.forEach((user) => {
		if (user.id == req.params.id) {
			// product = { ...product, ...req.body, image: req.files[0].filename }
			user.first_name = req.body.first_name,
            user.last_name = req.body.last_name,
            user.email = req.body.email,
            user.password = bcrypt.hashSync(req.body.password, 10),
            user.image = user.image,
            user.category = req.body.category
            const usersJson = JSON.stringify(users)
            fs.writeFileSync(usersFilePath, usersJson)
            return user.id
		}
	})
}

const deleteUser = (req) => {
    const usersNotDeleted = users.filter((user) => user.id != req.params.id)
    const usersJson = JSON.stringify(usersNotDeleted)
    fs.writeFileSync(usersFilePath, usersJson)
}

const controladorUsuarios = {
    login: (req , res) =>{
        res.render ('./users/login')
    },
    loginProcess: (req , res) =>{
        let errors = validationResult(req)
        if (errors.isEmpty()){
            const userToLogin = users.find(user => users.email === req.body.email)
            if ( userToLogin ){
                    if(bcrypt.compareSync (req.body.password ,userToLogin.password )){
                        req.session.userLogged = userToLogin;
                        
                }   

                
            }else{
            return res.render('login' , { errors :errors.errors})
        }
            }},

        
        

    
        
    
    register: (req , res) =>{
        res.render ('./users/register')
    },
    profile: (req, res) => {
        const user = users.find(item =>  item.id == req.params.id)
        res.render('./users/profile', {user})
    },
    saveUser: (req, res) => {
        saveUser(req)
        res.redirect('/')
    },
    profileImage: (req, res) => {
        setImage(req)
        res.redirect('/')
    },
    editUser: (req, res) => {
        editUser(req)
        res.redirect('/')
    },
    newPassword: (req, res) => {
        res.redirect('/users/login')
    },
    deleteUser: (req, res) => {
        let i = deleteUser(req)
        res.redirect('/')
    }
}
    

module.exports = controladorUsuarios;