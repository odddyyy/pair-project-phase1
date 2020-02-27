const route = require('express').Router()
const user = require(`../routes/userRoute`)
const food = require(`../routes/foodRoute`)
const transaction = require(`../routes/transactionRoute`)
const login = require(`../routes/loginRoute`)

route.get('/', (req, res) => {
    res.render('home', { session: req.session.user})
})

route.use(`/foods`, food)
route.use(`/transaction`, transaction)
route.use(`/user`, user)
route.use(`/login`, login)

module.exports = route