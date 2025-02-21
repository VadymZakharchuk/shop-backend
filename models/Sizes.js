module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Sizes', {
    int: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    us: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
}
