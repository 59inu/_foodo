module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('menus',{
    menu_name : DataTypes.STRING,
    menu_ing : DataTypes.STRING
  })
};