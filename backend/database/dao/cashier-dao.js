const _ = require('lodash');
const logger = require('../../utils/logger');
const { db, sequelize } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { cashier, employee } = db;

const cashierDao = {
  async query(reqParams) {
    const {
      id,
      q,
    } = reqParams;

    let where;
    let response = {};

    where = {};

    if (q) {
      where.number = q; 
    } else if (id) {
      where.id = id;
    }

    if (id) {
      response = await cashier.findByPk(id);
      const averageByDay = await sequelize.query(
        `
        select "cashierId",
        "sellDate"::date,
        avg(sellout)
        from cashierproducts
        where "cashierId"=${id}
        group by ("cashierId","sellDate"::date);
        `
      );
      const average = await sequelize.query(
        `
        with avg_by_day as (
          select "cashierId",
                 "sellDate"::date,
                 avg(sellout) as mid
          from cashierproducts
          group by ("cashierId","sellDate"::date,"sellout")
        )
        
        select avg(mid),
              "cashierId"
        from avg_by_day
        where "cashierId"=${id}
        group by ("cashierId");
        `
      )
      response = _.merge(
        response.dataValues,
        {
          avg: average[0][0] ? average[0][0].avg : null,
          avgByDay: averageByDay[0],
        },
      )
    } else {
      response = await cashier.findAll({ 
        where,
      });
    };
    console.log(response);
    return response;
  },
  async create(reqParams) {
    await cashier.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    const { id } = reqParams;

    await cashier.update(
      reqParams,
      { 
        where: { id},
        returning: true,
      },
    );
    return { message: 'updated' };
  },
  async delete(reqParams) {
    const { id } = reqParams;

    const response = await cashier.destroy(
      {
        where: { id },
      },
    );
    return response;
  },
};

module.exports = cashierDao;
