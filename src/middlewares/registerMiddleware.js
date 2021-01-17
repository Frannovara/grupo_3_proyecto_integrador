const fs = require('fs');
const path = require('path');
var {check} = require ('express-validator')

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


module.exports = (req , res , next) => {
        let repitedUser = users.find (user => req.body.email == user.email);
        if (repitedUser){
            res.render ('./users/register' , {repitedUser : repitedUser.email})
        }else{
            next()
        }

}