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
    }
}

module.exports = controller