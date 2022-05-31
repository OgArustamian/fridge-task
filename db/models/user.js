const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Product }) {
      this.belongsTo(Role, { foreignKey: 'role_id' });
      this.hasMany(Product, { foreignKey: 'user_id' });
      this.belongsToMany(Product, { through: 'Favourites' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
