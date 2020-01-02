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
    number: Joi.number().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "number" parameter',
      });
    }),
    type: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "type" parameter',
      });
    }),
    status: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "status" parameter',
      });
    }),
    storeid: Joi.number().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "storeId" parameter',
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
  }),
  body: Joi.object({
    name: Joi.string(),
    number: Joi.number(),
    type: Joi.string(),
    status: Joi.string(),
    storeid: Joi.number(),
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
