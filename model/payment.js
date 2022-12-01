const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Subscriptions = sequelize.define(
    "subscriptions",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      planId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: { type: DataTypes.DOUBLE, allowNull: false },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      sscode: { type: DataTypes.STRING, allowNull: false },
      orderId: { type: DataTypes.STRING, allowNull: false },
      status: DataTypes.STRING,
      message: DataTypes.STRING,
      resCode: DataTypes.STRING,
      rrn: DataTypes.STRING,
    },
    { tableName: "subscriptions" }
  );

  return Subscriptions;
};
