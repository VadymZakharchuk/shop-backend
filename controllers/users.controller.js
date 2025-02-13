const db = require("../models");
const { compare } = require("bcrypt");
const lzjs = require('lzjs')
const {sign} = require("jsonwebtoken");
const User = db.user;

exports.findAll = async () => {
  try {
    return await User.findAll()
  }
  catch (e) {
    console.error(e);
  }
};

exports.findOne = async (pk) => {
  try {
    return await User.findOne({ where: {id: pk}})
  }
  catch (e) {
    console.error(e);
  }
};

exports.create = async (body) => {
  let isPhoneBusy
  try {
    const phone = body.phone || null
    if (phone) {
      isPhoneBusy = await User.findOne({ where: { phone: phone } })
      if (isPhoneBusy) {
        return { message: `Duplicate entry ${phone} for key "users.phone"`, status: 409 }
      }
    }
    const user = await User.create({ ...body })
    const token = sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
    return { data: token, status: 200 }
  }
  catch (e) {
    console.error(e);
  }
};

exports.login = async (body) => {
  try {
    const { phone, password } = body;
    const passwordDecompressed = lzjs.decompressFromBase64(password)
    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {
      return { data: 'Authentication failed - no such user', status: 401 };
    }
    const passwordMatch = await compare(passwordDecompressed, user.passwordHash);
    if (!passwordMatch) {
      return { data: 'Authentication failed - incorrect password', status: 401 };
    }
    const token = sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
    return { data: token, status: 200 };
  } catch (e) {
    console.error(e);
  }
}

exports.update = async (body, id) => {
  let isPhoneBusy
  try {
    const phone = body.phone || null
    if (phone) {
      isPhoneBusy = await User.findOne({ where: { phone: phone } })
      if (isPhoneBusy) {
        return { message: `Duplicate entry ${phone} for key "users.phone"`, status: 409 }
      }
    }
    const res = await User.update({ ...body }, { where: { id: id } })
    return { data: res, status: 200 }
  }
  catch (e) {
    console.error(e);
  }
};

exports.destroy = async (pk) => {
  try {
    return await User.destroy({ where: {id: pk}})
  }
  catch (e) {
    console.error(e);
  }
};