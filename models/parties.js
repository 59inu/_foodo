module.exports = (sequelize, DataTypes) => {
  return sequelize.define('parties', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  })
}
