const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize')
const Category = db.category;

exports.findAll = async (params) => {
  try {
    let lang = params.lang || ''
    if (!lang) return await Category.findAll()
    delete params.lang
    const excludeList = lang === 'en' ? ['name_uk', 'description_uk'] : ['name_en', 'description_en']
    if ('id' in params) {
      const id = +params.id
      return await Category.findAll({
        where: { id: id },
        attributes: {
          exclude: excludeList
        }
      })
    }
    const id = +params.id
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