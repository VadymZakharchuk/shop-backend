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

exports.add = async (body) => {
  try {
    if (!body.userId) return { message: 'User not found', status: 404 }
    if (!body.productId) return { message: 'Product not found', status: 404 }
    const isFavourite = await Favourite.findOne({ where: { userId: body.userId, productId: body.productId } })
    if (isFavourite) return { message: 'Product already in favourites', status: 409 }
    return await Favourite.create({...body})
  }
  catch (e) {
    console.error(e);
  }
};

exports.remove = async (body) => {
  try {
    if (!body.userId) return {message: 'User not found', status: 404}
    if (!body.productId) return {message: 'Product not found', status: 404}
    const isFavourite = await Favourite.findOne({where: {userId: body.userId, productId: body.productId}})
    if (!isFavourite) return {message: 'Product not in favourites', status: 409}
    return await Favourite.destroy({where: {userId: body.userId, productId: body.productId}})
  } catch (e) {
    console.error(e);
  }
}