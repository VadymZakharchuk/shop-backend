module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Colors', {
    name_uk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
}
