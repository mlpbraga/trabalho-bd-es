const op = require('sequelize').Op;
const _ = require('lodash');
const logger = require('../../utils/logger');
const { db, sequelize } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { store, employee, cashier } = db;

const StoreDao = {
  async query(reqParams) {
    const {
      id,
      q,
      date,
    } = reqParams;
  
    let where;
    let response = {};

    where = {};
    include = { model: cashier }

    if (q) {
      where.name = { [op.like]: `%${q}%` };
      response = await store.findAll({ where, include });
    } else if (id) {
      where.id = id;
      const formatedDate = `${date.substr(0,4)}-${date.substr(4,2)}-${date.substr(6,2)}`;
      const storeData = await store.findOne({ where, include });
      const workHours = await sequelize.query(
        `
        select "storeId",
        sum("exitTime"-"entryTime") as workhours,
        "createdAt"::date
        from employeestores
        where "storeId"=${id} and "createdAt"::date='${formatedDate}'
        group by ("storeId", "createdAt"::date);
        `
      );
      const sales = await sequelize.query(
        `
        select count(cashierproducts.id),
        "sellDate"::date
        from cashierproducts join cashiers c on cashierproducts."cashierId" = c.id
        where "storeId"=${id} and "sellDate"::date ='${formatedDate}'
        group by ("sellDate"::date, "storeId");
        `
      );
      console.log('afdsghjkljhgfd');
      response = _.merge(
        {},
        { storeData },
        { workHours: workHours[0][0] ? workHours[0][0].workhours : {}},
        { sales: sales[0][0] ?  parseInt(sales[0][0].count) : 0},
      )
    } else {
      response = await store.findAll({ where, include });
    }

    return response;
  },
  async create(reqParams) {
    await store.create(reqParams);
    return { message: 'created' };
  },
  async update(reqParams) {
    const { id } = reqParams;
    
    await store.update(
      reqParams,
      { 
        where: {id},
        returning: true,
      },
    );

    return { message: 'updated' };;
  },
  async delete(reqParams) {
    const { id } = reqParams;

    const response = await store.destroy(
      {
        where: { id },
      },
    );
    return response;
  },
};

module.exports = StoreDao;
