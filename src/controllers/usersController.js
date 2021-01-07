const { render } = require("ejs");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const newUser = function(req) {
	let newUser = {
		id: Date.now(),
		...req.body,
        image: "/images/users/default.png",
        category: 'user',
    };
    delete newUser.terms
    newUser.password = bcrypt.hashSync(newUser.password, 10);
	users.push(newUser);
	let usersJSON = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usersJSON)
    console.log(newUser)
	return newUser.id
}
const setImage = (req) => {
    users.forEach((user) => {
        if (user.id == req.params.id) {
            user.image = req.files[0].filename,
        }
    })
    const usersJson = JSON.stringify(users)
	fs.writeFileSync(usersFilePath, usersJson)
	return user.id
}

const editUser =  (req) => {
	users.forEach((user) => {
		if (user.id == req.params.id) {
			// product = { ...product, ...req.body, image: req.files[0].filename }
			user.first_name = req.params.first_name,
            user.last_name = req.params.last_name,
            user.email = req.params.email,
            user.password = bcrypt.hashSync(req.params.password, 10),
		    user.category = req.params.category
		}
	})
	const usersJson = JSON.stringify(users)
	fs.writeFileSync(usersFilePath, usersJson)
	return user.id
}

const controladorUsuarios = {
    login: (req , res) =>{
        res.render ('./users/login')
    },
    register: (req , res) =>{
        res.render ('./users/register')
    },
    newPassword: (req, res) => {
        res.render('./users/newPassword')
    },
    profile: (req, res) => {
        const user = users.find(item =>  item.id == req.params.id)
        res.render('./users/profile', {user})
    },
    saveUser: (req, res) => {
        let id = newUser(req)
        res.redirect('/users/profile/' + id)
    },
    profileImage: (req, res) => {
        let id = setImage(req)
        res.redirect('users/profile/' + id)
    },
    editUser: (req, res) => {
        let id = editUser(req)
        res.redirect('users/profile/' + id )
    }
}

module.exports = controladorUsuarios;