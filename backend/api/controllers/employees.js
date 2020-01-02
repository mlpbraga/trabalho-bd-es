const logger = require('../../utils/logger');
const employeeRequestFormatter = require(
  '../formatters/request/employees',
);
const employeeDAO = require('../../database/dao/employee-dao');
// const constant = require('../..//constants');

// const _ = require('lodash');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = employeeRequestFormatter.format(req);
      response = await employeeDAO.create(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`employee Controller::handlePost ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handlePut(req, res, next) {
    let response;
    try {
      const reqParams = employeeRequestFormatter.format(req);
      response = await employeeDAO.update(reqParams);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`employee Controller::handlePut ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleDelete(req, res, next) {
    let response;
    try {
      const reqParams = employeeRequestFormatter.format(req);
      response = await employeeDAO.delete(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`employee Controller::handleDelete ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = employeeRequestFormatter.format(req);
      response = await employeeDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`employee Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
