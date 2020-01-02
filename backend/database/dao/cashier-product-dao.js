const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { cashierproduct } = db;

const SellDao = {
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
    try {
      response = await cashierproduct.findAll({ 
        where,
        // attributes,
      });
      return response;
    } catch (e) {
      throwBadRequest({message: 'impossible find sell' })
    }
  },
  async create(reqParams) {
    try {
      await reqParams.insertSells.forEach(async (sell) => {
        await cashierproduct.create(sell);
      });
      return { message: 'created' };
    } catch (e) {
      throwBadRequest(e);
    }
  },
  async update(reqParams) {
    const { id } = reqParams;

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
