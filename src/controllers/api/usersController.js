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
            
            users = users.map(user => user = {id : user.id , first_name : user.first_name , last_name : user.last_name , email : user.email , detail : `/api/users/${user.id}`})

            let usersResponse= {
                meta : {
                    status : 200,
                    count : users.length,
                    url : "/api/users"
                },
                data : users
            }
            
            res.json(usersResponse)
        })     
    },
    description : (req , res)=>{
        db.Users.findAll({
            where : [{
                id : req.params.id
            }]
        })
        .then(user => {
            user = user.map(user => user = {id : user.id , first_name : user.first_name , last_name : user.last_name , email : user.email , image : user.profile_image }) 

            let userResponse= {
                meta : {
                    status : 200,
                    
                    url : `/api/users/${req.params.id}`
                },
                data : user
            }
           
           res.json(userResponse)
           
            
        })
    }        
            

       
    
}

module.exports = controller