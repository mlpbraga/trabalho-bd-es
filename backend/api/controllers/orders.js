const logger = require('../../utils/logger');
const orderRequestFormatter = require(
  '../formatters/request/orders',
);
const orderDAO = require('../../database/dao/order-dao');
// const constant = require('../..//constants');

// const _ = require('lodash');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = orderRequestFormatter.format(req);
      response = await orderDAO.create(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`order Controller::handlePost ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handlePut(req, res, next) {
    let response;
    try {
      const reqParams = orderRequestFormatter.format(req);
      response = await orderDAO.update(reqParams);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`order Controller::handlePut ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleDelete(req, res, next) {
    let response;
    try {
      const reqParams = orderRequestFormatter.format(req);
      response = await orderDAO.delete(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`order Controller::handleDelete ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = orderRequestFormatter.format(req);
      response = await orderDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`order Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
