module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('ingredients',{
    ing_name : DataTypes.STRING
  })
};