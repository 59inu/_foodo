module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('menu_ing',{
    menu_id : DataTypes.INTEGER,
    ing_id : DataTypes.INTEGER
  })
};