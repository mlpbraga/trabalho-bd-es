const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { employee } = db;

const employeeDao = {
  async query(reqParams) {
    const {
      id,
      q,
    } = reqParams;

    // const attributes = ['employeeId','number','type','status','storeId'];
    let where;
    let response = {};

    where = {};

    if (q) {
      where.name = { [op.like]: `%${q}%` }; 
    } else if (id) {
      where.employeeId = id;
    }

    response = await employee.findAll({ 
      where,
      // attributes,
    });
    return response;
  },
  async create(reqParams) {
    await employee.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    const { id } = reqParams;

    await employee.update(
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

    const response = await employee.destroy(
      {
        where: { id },
      },
    );
    return response;
  },
};

module.exports = employeeDao;
