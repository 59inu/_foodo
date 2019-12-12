module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_ing', {
    exp: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    memo: DataTypes.STRING,
    frozen: DataTypes.BOOLEAN,
    unit: DataTypes.STRING,
    deleted: DataTypes.INTEGER,
    entryQ: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  })
}
