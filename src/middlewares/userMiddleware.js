module.exports = {
    userToLogin: (req, res, next) => {
        if (req.session.user) {
            next()
        } else {
            return res.redirect('/users/login')
        }
    },
    userLogged: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/users/profile')
        } else {
            next()
        }
    },
    userAdmin: (req, res, next) => {
        if (req.session.user.category == 'admin') {
            next()
        } else {
            res.redirect('/')
        }
    }
}