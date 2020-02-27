const route = require('express').Router()
const foodController = require (`../controllers/foodController`)
const login = require(`../routes/loginRoute`)

route.use((req, res, next) => {
    if(req.session.user){
        next()
    } else {
        res.redirect(`/login`)
    }
})
route.get(`/checkout`, foodController.checkout)
route.get(`/add`, foodController.adminAdd)
route.post(`/add`, foodController.addFood)
route.get(`/delete/:foodId`, foodController.delete)
route.get(`/edit/:foodId`, foodController.editForm)
route.post(`/edit/:foodId`, foodController.edit)
route.get(`/:id`, foodController.show)
route.post(`/order/:id`, foodController.add)
route.get(`/cart/:id`, foodController.showCart)

module.exports = route