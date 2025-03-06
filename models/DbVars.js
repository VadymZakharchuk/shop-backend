module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DbVars', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description_uk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description_en: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
}
