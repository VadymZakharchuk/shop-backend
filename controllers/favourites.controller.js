const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize')
const Favourite = db.favourite;

exports.findAll = async (lang = 'uk', userId = 0) => {
  try {
    if (!userId) return await Favourite.findAll()
    const excludeList = lang === 'en' ? ['name_uk', 'description_uk'] : ['name_en', 'description_en']
    return await Favourite.findAll({
      attributes: { exclude: excludeList },
      where: { userId: userId },
      include: ['product'],
    })
  }
  catch (e) {
    console.error(e);
  }
};