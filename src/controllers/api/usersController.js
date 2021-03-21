const db = require( '../../database/models' );

const controller = {
    emailRegistered: (req,res) =>{
        db.Users.findOne({
            where: {
                email: req.params.email
            },
            paranoid: false
        })
        .then(user => {
            let result
            if (user) {
                result = true
            } else {
                result = false
            }
            usuario = {
                "email": result
            }

            return res.json(usuario)
        })
    },
    list: (req , res) =>{
        db.Users.findAll()
        .then(users =>{
            
            users = users.map(user => user = {id : user.id , first_name : user.first_name , last_name : user.last_name , email : user.email })

            let usersResponse= {
                meta : {
                    status : 200,
                    count : users.length
                },
                data : users
            }
            
            res.json(usersResponse)
        })     
            
            

       
    }
}

module.exports = controller