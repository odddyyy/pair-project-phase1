'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    group: DataTypes.STRING
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsToMany(models.User, { through:models.Transaction, foreignKey:`food_id` })
  };
  return Food;
};