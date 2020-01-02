const logger = require('../../../utils/logger');
const productRequestFormatter = require(
  '../../formatters/request/products',
);
const productDAO = require('../../../database/dao/product-dao');
// const constant = require('../..//constants');

// const _ = require('lodash');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = productRequestFormatter.format(req);
      response = await productDAO.create(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`product Controller::handlePost ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handlePut(req, res, next) {
    let response;
    try {
      const reqParams = productRequestFormatter.format(req);
      response = await productDAO.update(reqParams);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`product Controller::handlePut ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleDelete(req, res, next) {
    let response;
    try {
      const reqParams = productRequestFormatter.format(req);
      response = await productDAO.delete(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`product Controller::handleDelete ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = productRequestFormatter.format(req);
      response = await productDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`product Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
