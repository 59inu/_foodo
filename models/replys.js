module.exports = (sequelize, DataTypes) => {
  return sequelize.define('replys', {
    content: DataTypes.STRING
  })
}
