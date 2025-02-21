const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize')
const Sizes = db.sizes;

exports.findAll = async (params) => {
  try {
    return await Sizes.findAll()
  }
  catch (e) {
    console.error(e);
  }
};