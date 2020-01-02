const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { 
  productStore,
} = db;

const productStoreDao = {
  async query(reqParams) {
    const {
      id,
      q,
    } = reqParams;

    // const attributes = ['sellId','number','type','status','storeId'];
    let where;
    let response = {};

    where = {};

    if (q) {
      where.name = { [op.like]: `%${q}%` }; 
    } else if (id) {
      where.sellId = id;
    }

    response = await Sell.findAll({ 
      where,
      // attributes,
    });
    return response;
  },
  async create(reqParams) {
    await productStore.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    const { 
      productId,
    } = reqParams;
    await productStore.create(reqParams);
    await cashierproduct.update(
      reqParams,
      { 
        where: { sellId: id},
        returning: true,
      },
    );

    return { message: 'updated' };
  },
  async delete(reqParams) {
    const { id } = reqParams;

    const response = await cashierproduct.destroy(
      {
        where: { sellId: id },
      },
    );
    return response;
  },
};

module.exports = SellDao;
