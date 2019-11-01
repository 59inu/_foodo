const express = require('express')
const cors = require('cors')
const session = require('express-session')
var sequelize = require('./models/index').sequelize

const userRouter = require('./routes/user')
const ingRouter = require('./routes/ingredient')
const menuRouter = require('./routes/menu')

sequelize.sync()

const app = express()
const port = 4000
app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: 'Foodo'
  })
)

app.use('/users', userRouter)
app.use('/ingredients', ingRouter)
app.use('/menus', menuRouter)

app.set('port', port)
app.listen(app.get('port'))

module.exports = app
