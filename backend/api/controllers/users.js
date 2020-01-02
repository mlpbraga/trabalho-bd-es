const logger = require('../../utils/logger');
const userRequestFormatter = require(
  '../formatters/request/users',
);
const userDAO = require('../../database/dao/user-dao');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = userRequestFormatter.format(req);
      response = await userDAO.create(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`user Controller::handlePost ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handlePut(req, res, next) {
    let response;
    try {
      const reqParams = userRequestFormatter.format(req);
      response = await userDAO.update(reqParams);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`user Controller::handlePut ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleDelete(req, res, next) {
    let response;
    try {
      const reqParams = userRequestFormatter.format(req);
      response = await userDAO.delete(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`user Controller::handleDelete ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = userRequestFormatter.format(req);
      response = await userDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`user Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
