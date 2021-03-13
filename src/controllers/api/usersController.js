const db = require( '../../database/models' );

const controller = {
    list: (req,res) =>{
        db.Users.findAll()
        .then(users => {
            /**** ONLY RETURNS THE USERS EMAIL****/
            users = users.map( user => user = user.email)
            usuarios = {
                "meta": {
                    "status": 200,
                    "count": users.length,
                    "url": "api/users/"
                },
                "data": users
            }

            return res.json(usuarios)
        })
    }
}

module.exports = controller