const db = require("../models");
const Favourite = db.favourite;

exports.findAll = async (lang = 'uk', userId = 0) => {
  try {
    if (!userId) return await Favourite.findAll()
    const excludeList = lang === 'en' ? ['name_uk', 'description_uk'] : ['name_en', 'description_en']
    return await Favourite.findAll({
      attributes: { exclude: excludeList },
      where: { userId: userId },
      include: [{
        model: db.product,
        as: 'product',
        foreignKey: 'productId',
        attributes: { exclude: excludeList },
        include: [
          {
            model: db.colors,
            as: 'colors',
            foreignKey: 'colorId',
            attributes: { exclude: excludeList },
          },
          {
            model: db.category,
            as: 'category',
            foreignKey: 'categoryId',
            attributes: { exclude: excludeList },
          }
        ]
      }],
    })
  }
  catch (e) {
    console.error(e);
  }
};