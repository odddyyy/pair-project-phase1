const route = require('express').Router()
const loginController = require (`../controllers/loginController`)

route.get(`/`, loginController.show)
route.post(`/`, loginController.doLogin)

route.get(`/out`, (req, res) => {
    req.session.destroy(function (err) {
        res.redirect(`/login`)
    })
})

route.use((req, res, next) => {
    if(req.session.user){
        next()
    } else {
        res.redirect(`/login`)
    }
})
module.exports = route