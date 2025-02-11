const db = require("../models");
const Product = db.product;

exports.findAll = async (params) => {
  try {
    return await Product.findAll(params)
  }
  catch (e) {
    console.error(e);
  }
};

exports.create = async (body) => {
  try {
    const res = await Product.create({ ...body })
    return { data: res, status: 200 }
  }
  catch (e) {
    console.error(e);
  }
};

exports.update = async (body, id) => {
  try {
    const res = await Product.update({ ...body }, { where: { id: id } })
    return { data: res, status: 200 }
  }
  catch (e) {
    console.error(e);
  }
};