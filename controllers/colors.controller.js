const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize')
const Colors = db.colors;

exports.findAll = async (params) => {
  try {
    return await Colors.findAll(params);
  }
  catch (e) {
    console.error(e);
  }
};