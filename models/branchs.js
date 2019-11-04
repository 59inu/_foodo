module.exports = (sequelize, DataTypes) => {
  return sequelize.define('branchs', {
    branch_name: DataTypes.STRING
  })
}
