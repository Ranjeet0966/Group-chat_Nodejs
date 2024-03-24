const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const ForgotPassword = sequelize.define("forgotPassword", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  isActive: Sequelize.BOOLEAN,
});

module.exports = ForgotPassword;