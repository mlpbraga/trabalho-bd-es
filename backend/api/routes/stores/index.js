const { celebrate } = require('celebrate');
const { Router } = require('express');
const {
  getSchema,
  postSchema,
  putSchema,
  deleteSchema,
} = require('./validation');
const storesController = require('../../controllers/stores');
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
  storesController.handleGet,
);

router.post(
  '/',
  celebrate(postSchema, joiOptions),
  authMiddleware,
  storesController.handlePost,
);

router.put(
  '/',
  celebrate(putSchema, joiOptions),
  authMiddleware,
  storesController.handlePut,
);

router.delete(
  '/',
  celebrate(deleteSchema, joiOptions),
  authMiddleware,
  storesController.handleDelete,
);

module.exports = router;
