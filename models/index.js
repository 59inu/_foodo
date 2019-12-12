const config = require('./../config/config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  'foodo', 'foodo', config.db.password, { host: 'foodo.cyx2csl3obmx.us-east-2.rds.amazonaws.com', dialect: 'mysql' }

)
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('./users')(sequelize, Sequelize)
db.Ing = require('./ingredients')(sequelize, Sequelize)
db.Menu = require('./menus')(sequelize, Sequelize)
db.User_Ing = require('./user_ing')(sequelize, Sequelize)

db.User.hasMany(db.User_Ing)
db.User_Ing.belongsTo(db.User)

db.Ing.hasMany(db.User_Ing)
db.User_Ing.belongsTo(db.Ing)

db.Menu.belongsTo(db.Ing)
db.Ing.hasMany(db.Menu)

module.exports = db
