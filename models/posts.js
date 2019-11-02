module.exports = (sequelize, DataTypes) => {
  return sequelize.define('posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    max: DataTypes.INTEGER,
    current: DataTypes.INTEGER
  })
}
