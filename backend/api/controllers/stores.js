const logger = require('../../utils/logger');
const StoreRequestFormatter = require(
  '../formatters/request/stores',
);
const StoreDAO = require('../../database/dao/store-dao');
// const constant = require('../..//constants');

// const _ = require('lodash');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = StoreRequestFormatter.format(req);
      response = await StoreDAO.create(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`Store Controller::handlePost ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handlePut(req, res, next) {
    let response;
    try {
      const reqParams = StoreRequestFormatter.format(req);
      response = await StoreDAO.update(reqParams);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`Store Controller::handlePut ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleDelete(req, res, next) {
    let response;
    try {
      const reqParams = StoreRequestFormatter.format(req);
      response = await StoreDAO.delete(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`Store Controller::handleDelete ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = StoreRequestFormatter.format(req);
      response = await StoreDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`Store Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
