const sequelize = require("../../config/sequelize");
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      // allowNull defaults to true
    },
    image: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = User;
