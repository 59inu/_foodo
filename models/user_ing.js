module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('user_ing',{
    user_id : DataTypes.INTEGER,
    ing_id : DataTypes.INTEGER,
    day : DataTypes.STRING,
    restDay : DataTypes.INTEGER
  })
};