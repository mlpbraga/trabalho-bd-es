const logger = require('../../../utils/logger');
const supplierRequestFormatter = require(
  '../../formatters/request/suppliers/products',
);
const supplierDAO = require('../../../database/dao/supplier-product-dao');
// const constant = require('../..//constants');

// const _ = require('lodash');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = supplierRequestFormatter.format(req);
      response = await supplierDAO.create(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`supplier Controller::handlePost ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handlePut(req, res, next) {
    let response;
    try {
      const reqParams = supplierRequestFormatter.format(req);
      response = await supplierDAO.update(reqParams);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`supplier Controller::handlePut ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleDelete(req, res, next) {
    let response;
    try {
      const reqParams = supplierRequestFormatter.format(req);
      response = await supplierDAO.delete(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`supplier Controller::handleDelete ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = supplierRequestFormatter.format(req);
      response = await supplierDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`supplier Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
