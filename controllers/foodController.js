const ModelFood = require(`../models`).Food
const ModelTransaction = require(`../models`).Transaction
const ModelUser = require(`../models`).User
const calculate = require(`../helper/calculateTotal`)
const convert = require(`../helper/convert`)

class FoodController {

    static show (req, res) {
        let session = req.session.user
        ModelFood.findAll()
        .then(food => {
            res.render('foods', { food, session })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static add (req, res) {
        let userId = req.params.id
        let minus = req.body.quantity
        let foodId = req.body.id
        let kurang = null
        let idKurang = null
        let transaction = []
        // res.send(req.body)
        for (let i = 0; i<minus.length; i++) {
            if (minus[i] != 0) {
                transaction.push({user_id:userId, food_id:foodId[i], quantity: minus[i]})
            }
        }
        // res.send(transaction)
        minus.forEach((i,index)=> {
            if (i != 0){
                kurang = i
                idKurang = foodId[index]
            }
        })
        ModelFood.findByPk(idKurang)
        .then(data => {
            let stockUpdate = Number(data.stock - kurang)
            let obj = {
                stock:stockUpdate
            }
            return ModelFood.update(obj, {where:{id:idKurang}})
        })
        .then(data => {
            return ModelTransaction.bulkCreate(transaction)
        })
        .then(data => {
            // console.log(`masuk`)
            res.redirect(`/foods/cart/${userId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showCart (req, res) {
        let userId = req.params.id
        // res.send(`masuk show cart`)
        let session = req.session.user
        ModelUser.findOne({where:{id:userId}, include: ModelFood})
        .then(data => {
            res.render('cart', { data, session,calculate, convert })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static adminAdd (req, res) {
        // res.send(`CROT`)
        res.render(`addFoodForm`)
    }

    static addFood (req, res) {
        let obj = {
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            group: req.body.group
        }

        ModelFood.create(obj)
        .then(data => {
            res.redirect(`/user/admin`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete (req, res) {
        // res.send(req.params.foodId)
        let foodId = req.params.foodId
        ModelFood.destroy({where:{id:foodId}})
        .then(data => {
            res.redirect(`/user/admin`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editForm (req, res) {
        let foodId = req.params.foodId
        ModelFood.findByPk(foodId)
        .then(data => {
            res.render(`editForm`, { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static edit (req, res) {
        let id = req.params.foodId
        let obj = {
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            group: req.body.group
        }
        // res.send(obj)
        ModelFood.update(obj, {where:{id:id}})
        .then(data => {
            res.redirect(`/user/admin`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static checkout(req, res){
        // res.send(`masuk`)
        res.render(`checkout`)
    }
}

module.exports = FoodController