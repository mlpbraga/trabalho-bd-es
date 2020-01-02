const Joi = require('joi');
const { throwBadRequest } = require('../../../utils/errors/bad-request');

const getSchema = {
  query: Joi.object({
    q: Joi.string(),
    id: Joi.string(),
    store: Joi.number(),
  }).max(1),
};

const postSchema = {
  query: Joi.object({}).max(0),
  body: Joi.object({
    name: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "name" parameter',
      });
    }),
    unitformat: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "unitFormat" parameter',
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
    unitformat: Joi.string(),
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
