const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize')
const Orders = db.orders;

exports.findAll = async (params) => {
  try {
    return await Orders.findAll(params);
  }
  catch (e) {
    console.error(e);
  }
};

exports.newOrderNo = async () => {
  try {
    return await Orders.findAll( {
      attributes: [
        [Sequelize.fn('MAX', Sequelize.col('orderNo')), 'newOrderNo'],
      ],
    });
  }
  catch (e) {
    console.error(e);
  }
};