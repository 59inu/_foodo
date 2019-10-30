module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('user_ing',{
    user_id : DataTypes.INTEGER,
    ing_id : DataTypes.INTEGER,
    exp : DataTypes.STRING,
    quantity : DataTypes.INTEGER,
    memo : DataTypes.STRING,
    frozen : DataTypes.BOOLEAN
  })
};