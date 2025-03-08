const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require('sequelize')
const Orders = db.orders;
const Product = db.product;

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

exports.create = async(body) => {
  console.log(body)
  const bodyArr = Object.values(body).map(item => {
    return {
      productId: item.productId,
      quantity: item.quantity,
      orderNo: item.orderNo,
      statusId: item.statusId,
      isAvailable: true
    }
  })
  const iDs = Object.values(body).map((item) => item.productId)
  const availableProducts = await Product.findAll({
    attributes: [
      'id',
      'quantity'
    ],
    where: {
      id: {
        [Op.in]: iDs
      }
    }
  })
  bodyArr.forEach((item) => {
    const orderedProduct = availableProducts.filter((product) => product.id === item.productId)[0]
    if (orderedProduct.quantity - item.quantity < 0) item.isAvailable = false;
  })
  const isOrderAvailable = !bodyArr.some((item) => item.isAvailable === false)
  if (isOrderAvailable) {
    try {
      for (const item of Object.values(body)) {
        await Orders.create({...item});
      }
      return { message: "created"};
    } catch (e) {
      console.error(e);
    }
  }
  const notAvailableProducts = bodyArr.filter((item) => item.isAvailable === false)
  return { message: "not available", notAvailableProducts }
}