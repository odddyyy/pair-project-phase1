const ModelUser = require(`../models`).User
const bcrypt = require('bcrypt');
const saltRounds = 10;

class LoginController {

    static show (req, res) {
        res.render(`login`, {session: req.session.user})
    }

    static doLogin (req, res) {
        let user_id = null
        let user = {
            username: req.body.username,
            password: req.body.password,
        }
        let hashed = null
        ModelUser.findOne({where:{username:user.username}})
        .then(data => {
            hashed = data.password
            user_id = data.id
            return bcrypt.compare(user.password, data.password)
        })
        .then((result) => {
            if (result) {
                user.password = hashed
                return ModelUser.findAll({where:user})
            } else {
                res.send(`invalid username / password`)
            }
        })
        .then(data => {
            // res.send(data)
            if (data.length > 0) {
                req.session.user = {
                    username:data[0].username,
                    role:data[0].role,
                    name:data[0].first_name,
                    id:data[0].id
                }
                if (req.session.user.role == `user`) {
                    res.redirect(`/foods/${req.session.user.id}`)
                } else {
                    res.redirect(`/user/admin`)
                }
            } else {
                res.send(`invalid username / password`)
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = LoginController