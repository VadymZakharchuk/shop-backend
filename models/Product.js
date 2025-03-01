module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    name_uk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_en: {
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
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'no-image-available.png'
    },
    colorId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    size: {
      type: DataTypes.STRING,
      defaultValue: 's'
    },
    sex: {
      type: DataTypes.STRING,
      defaultValue: 'u'
    },
    quantity: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    views_count: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    categoryId: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });
}
