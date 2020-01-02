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
    name: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "name" parameter',
      });
    }),
    rg: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "rg" parameter',
      });
    }),
    cpf: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "cpf" parameter',
      });
    }),
    address: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "address" parameter',
      });
    }),
    phonenumber: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "phoneNumber" parameter',
      });
    }),
    birthdate: Joi.date().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "birthDate" parameter',
      });
    }),
    role: Joi.string().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "role" parameter',
      });
    }),
    salary: Joi.number().required().error(() => {
      throwBadRequest({
        code: 400,
        message: 'Missing "salary" parameter',
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
    rg: Joi.string(),
    cpf: Joi.string(),
    address: Joi.string(),
    phonenumber: Joi.string(),
    birthdate: Joi.date(),
    role: Joi.string(),
    salary: Joi.number(),
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
