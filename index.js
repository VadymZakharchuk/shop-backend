const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const favouritesRouter = require('./routes/favourites');
const sizesRouter = require('./routes/sizes');
const colorsRouter = require('./routes/colors');
const ordersRouter = require('./routes/orders');
const loggerMiddleware = require('./middleware/logger')
const errorMiddleware = require('./middleware/error')

require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors())
// app.use(loggerMiddleware)

app.use('/public', express.static(__dirname+"/public"))

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/favourites', favouritesRouter);
app.use('/api/sizes', sizesRouter);
app.use('/api/colors', colorsRouter);
app.use('/api/orders', ordersRouter);

app.set('view engine', 'ejs')
app.use(errorMiddleware)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// let pass = bcrypt.hash('123456',10)
// token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzkxNzM3NzYsImV4cCI6MTczOTIxNjk3Nn0.q1O2l97ryzAoeKBKeAgP07pIP5sVwtvWpqMyBtNnCJ4