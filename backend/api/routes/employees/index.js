const { celebrate } = require('celebrate');
const { Router } = require('express');
const {
  getSchema,
  postSchema,
  putSchema,
  deleteSchema,
} = require('./validation');
const employeesController = require('../../controllers/employees');
const authValidation = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: false,
};

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    return req.headers.authorization.includes('Bearer')
      ? authValidation.check(req, res, next)
      : authValidation.basicAuthentication(req, res, next);
  }
  return authValidation.basicAuthentication(req, res, next);
};

router.get(
  '/',
  celebrate(getSchema, joiOptions),
  authMiddleware,
  employeesController.handleGet,
);

router.post(
  '/',
  celebrate(postSchema, joiOptions),
  authMiddleware,
  employeesController.handlePost,
);

router.put(
  '/',
  celebrate(putSchema, joiOptions),
  authMiddleware,
  employeesController.handlePut,
);

router.delete(
  '/',
  celebrate(deleteSchema, joiOptions),
  authMiddleware,
  employeesController.handleDelete,
);

module.exports = router;
