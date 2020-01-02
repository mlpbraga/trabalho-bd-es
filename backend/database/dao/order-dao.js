const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { 
  order,
  orderproduct,
  product,
} = db;

const orderDao = {
  async query(reqParams) {
    const {
      id,
      q,
    } = reqParams;

    let where;
    let response = {};

    where = {};

    if (q) {
      where.name = { [op.like]: `%${q}%` }; 
    } else if (id) {
      where.orderId = id;
    }

    response = await order.findAll({ 
      where,
      include: {
        model: orderproduct,
        include: product,
      }
    });
    return response;
  },
  async create(reqParams) {
    await order.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    const { id } = reqParams;

    await order.update(
      reqParams,
      { 
        where: {id},
        returning: true,
      },
    );

    return { message: 'updated' };
  },
  async delete(reqParams) {
    const { id } = reqParams;

    const response = await order.destroy(
      {
        where: { id },
      },
    );
    return response;
  },
};

module.exports = orderDao;
