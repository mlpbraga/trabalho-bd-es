const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { 
  product,
  storeproduct,
} = db;

const productDao = {
  async query(reqParams) {
    const {
      id,
      q,
      store,
    } = reqParams;

    let where;
    let response = {};

    where = {};

    if (q) {
      where.name = { [op.like]: `%${q}%` }; 
    } else if (id) {
      where.productId = id;
    }
    if (store) {
      response = await storeproduct.findAll({
        where: { storeId: store },
        include: {
          model: product,
        }
      })
    } else {
      response = await product.findAll({ 
        where,
        // attributes,
      });
    }
    return response;
  },
  async create(reqParams) {
    await product.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    const { id } = reqParams;

    await product.update(
      reqParams,
      { 
        where: { id },
        returning: true,
      },
    );

    return { message: 'updated' };
  },
  async delete(reqParams) {
    const { id } = reqParams;

    const response = await product.destroy(
      {
        where: { id },
      },
    );
    return response;
  },
};

module.exports = productDao;
