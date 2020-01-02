const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { supplier } = db;

const supplierDao = {
  async query(reqParams) {
    const {
      id,
      q,
    } = reqParams;

    let where;
    let response = {};

    where = {};

    if (q) {
      where[op.or] = [
        { name: { [op.like]: `%${q}%` } },
      ];
    } else if (id) {
      where.supplierId = id;
    }
    response = await supplier.findAll({
      where,
    });
    return response;
  },
  async create(reqParams) {
    await supplier.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    console.log(reqParams)
    const { id } = reqParams;

    await supplier.update(
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

    const response = await supplier.destroy(
      {
        where: { id },
      },
    );
    return response;
  },
};

module.exports = supplierDao;
