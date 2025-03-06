module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Orders', {
    orderNo: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productId: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    userId: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    statusId: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    timestamps: true
  });
}
