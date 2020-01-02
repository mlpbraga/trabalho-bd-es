const logger = require('../../../utils/logger');
const cashierRequestFormatter = require(
  '../../formatters/request/cashiers/products',
);
const cashierDAO = require('../../../database/dao/cashier-product-dao');
// const constant = require('../..//constants');

// const _ = require('lodash');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = cashierRequestFormatter.format(req);
      console.log(reqParams);
      response = await cashierDAO.create(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`cashier products Controller::handlePost ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handlePut(req, res, next) {
    let response;
    try {
      const reqParams = cashierRequestFormatter.format(req);
      response = await cashierDAO.update(reqParams);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`cashier products Controller::handlePut ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleDelete(req, res, next) {
    let response;
    try {
      const reqParams = cashierRequestFormatter.format(req);
      response = await cashierDAO.delete(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`cashier product Controller::handleDelete ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = cashierRequestFormatter.format(req);
      response = await cashierDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`cashier product Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
