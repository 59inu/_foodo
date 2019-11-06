const express = require('express')
const cors = require('cors')
var sequelize = require('./models/index').sequelize

const userRouter = require('./routes/user')
const ingRouter = require('./routes/ingredient')
const menuRouter = require('./routes/menu')
const cookieParser = require('cookie-parser')
const config = require('./config/config')

sequelize.sync()

const app = express()
const port = config.app.port
app.use(cookieParser())

app.use(express.json())
app.use(cors({
  credentials: true
}))

// 재고 목록 라우트
app.use('/users', userRouter)
app.use('/ingredients', ingRouter)
app.use('/menus', menuRouter)


app.set('port', port)
app.listen(app.get('port'))

module.exports = app
