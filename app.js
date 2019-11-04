const express = require('express')
const cors = require('cors')
const session = require('express-session')
var sequelize = require('./models/index').sequelize

const userRouter = require('./routes/user')
const ingRouter = require('./routes/ingredient')
const menuRouter = require('./routes/menu')
const branchRouter = require('./routes/branch')
const cookieParser = require('cookie-parser')

sequelize.sync()

const app = express()
const port = 5000
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: 'Foodo'
  })
)
// 재고 목록 라우트
app.use('/users', userRouter)
app.use('/ingredients', ingRouter)
app.use('/menus', menuRouter)

// 공유주방 라우트
app.use('/branchs', branchRouter)

app.set('port', port)
app.listen(app.get('port'))

module.exports = app
