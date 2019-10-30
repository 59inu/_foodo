const express = require('express')
const cors = require('cors')
var sequelize = require('./models/index').sequelize;

const userRouter = require('./routes/user')
const ingRouter = require('./routes/ingredient')
const menuRouter = require('./routes/menu')

sequelize.sync()

const app = express()
const port = 4000
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/grocery', ingRouter)
app.use('/menus', menuRouter)

app.set('port', port)
app.listen(app.get('port'))

module.exports = app