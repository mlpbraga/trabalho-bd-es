const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models/index');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { user, employee } = db;

const userDao = {
  async query(reqParams) {
    const {
      id,
      q,
    } = reqParams;

    let where;
    let response = {};

    where = {};
    const include = {
      model: employee,
      // as: 'user_employee'
    };

    if (q) {
      where[op.or] = [
        { username: { [op.like]: `%${q}%` } },
      ];
    } else if (id) {
      where.id = id;
    }
    try {
      response = await user.findAll({
        where,
        include,
      });
      return response;
    } catch (e) {
      throwBadRequest({
        message: 'could not create user',
      })
    }   
  },
  
  async create(reqParams) {
    await user.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    console.log(reqParams)
    const { id } = reqParams;

    await user.update(
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

    const response = await user.destroy(
      {
        where: { id },
      },
    );
    return response;
  },
};

module.exports = userDao;
