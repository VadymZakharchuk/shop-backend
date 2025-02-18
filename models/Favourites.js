module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Favourites', {
    userId: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    productId: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    timestamps: true
  });
}
