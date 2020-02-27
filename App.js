const express = require('express')
const app =  express()
const PORT = 3000
const route = require('./routes')
const session = require(`express-session`)

app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended: true } ) )
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use('/', route)

app.listen(PORT, () => {
  console.log('on PORT ' + PORT)
})