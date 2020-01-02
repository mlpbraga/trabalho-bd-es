const Joi = require('joi');
const { throwBadRequest } = require('../../../utils/errors/bad-request');

const getSchema = {
  query: Joi.object({
    q: Joi.string(),
    id: Joi.string(),
  }).max(1),
};

const postSchema = {
  query: Joi.object({}).max(0),
  body: Joi.object({
    username: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "username" parameter',
      });
    }),
    password: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "password" parameter',
      });
    }),
    employeeid: Joi.number().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "employeeId" parameter',
      });
    }),
  }),
};

const putSchema = {
  query: Joi.object({ 
    id: Joi.number().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "id" parameter',
      });
    }),
  }).max(1),
  body: Joi.object({
    username: Joi.string(),
    name: Joi.string(),
    password: Joi.string(),
    employeeid: Joi.number(),
  }),
};

const deleteSchema = {
  query: Joi.object({
    id: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "id" parameter',
      });
    }),
  }).max(1),
};

module.exports = {
  getSchema,
  postSchema,
  putSchema,
  deleteSchema,
};
