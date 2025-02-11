const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize')
const Category = db.category;

exports.findAll = async (params) => {
  try {
    let lang = params || ''
    if (!lang) return await Category.findAll()
    const excludeList = lang === 'en' ? ['name_uk', 'description_uk'] : ['name_en', 'description_en']
    return await Category.findAll({
      attributes: {
        exclude: excludeList
      }
    })
  }
  catch (e) {
    console.error(e);
  }
};