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

exports.increaseCounter = async (id) => {
  try {
    const data = await Product.findByPk(id)
    const res = await Product.update({ views_count: data.views_count + 1 }, { where: { id: id } })
    return { data: res, status: 200 }
  }
  catch (e) {
    console.error(e);
  }
};