const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  "foodo", "root", "", {host : 'localhost', dialect :'mysql'}
)
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./users')(sequelize, Sequelize);
db.Ing = require('./ingredients')(sequelize, Sequelize);
db.Menu = require('./menus')(sequelize, Sequelize);
db.User_Ing = require('./user_ing')(sequelize, Sequelize);
db.Menu_Ing = require('./menu_ing')(sequelize, Sequelize);

module.exports = db;