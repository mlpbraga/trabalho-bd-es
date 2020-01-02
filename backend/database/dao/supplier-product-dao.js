const op = require('sequelize').Op;
const logger = require('../../utils/logger');
const { db } = require('../models');

const { throwBadRequest } = require('../../utils/errors/bad-request');

const { 
  supplierproduct,
  product,
  supplier,
} = db;

const supplierproductDao = {
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
      where.supplierproductId = id;
    }
    response = await supplier.findAll({
      where,
      include: {
        model: product,
        // as: 'supplierproduct',
      }

    });
    // console.log(response[0].getproducts())
    return response;
  },
  async create(reqParams) {
    const {
      productId,
      supplierId,
      sellin,
    } = reqParams;
    const found = await supplierproduct.findOne({
      where: {
        productproductId: productId,
        suppliersupplierId: supplierId
      }
    });
    console.log(reqParams);
    if (found) {
      await found.update({sellin});
      return { message: 'updated' };
    }
    console.log('bhbhfshajdhjsalkdas');
    await supplierproduct.create({
      productproductId: productId,
      suppliersupplierId: supplierId,
      sellin,
    });
    return { message: 'created' };
  },
  async update(reqParams) {
    console.log(reqParams)
    const { id } = reqParams;

    await supplierproduct.update(
      reqParams,
      {
        where: { supplierproductId: id },
        returning: true,
      },
    );

    return { message: 'updated' };
  },
  async delete(reqParams) {
    const { id } = reqParams;

    const response = await supplierproduct.destroy(
      {
        where: { supplierproductId: id },
      },
    );
    return response;
  },
};

module.exports = supplierproductDao;
