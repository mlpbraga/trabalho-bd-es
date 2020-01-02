const { celebrate } = require('celebrate');
const { Router } = require('express');
const {
  getSchema,
  postSchema,
  putSchema,
  deleteSchema,
} = require('./validation');
const productsController = require('../../controllers/products/index.js');
const markupController = require('../../controllers/products/markup.js');
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
  productsController.handleGet,
);

router.post(
  '/',
  celebrate(postSchema, joiOptions),
  authMiddleware,
  productsController.handlePost,
);

router.put(
  '/',
  celebrate(putSchema, joiOptions),
  authMiddleware,
  productsController.handlePut,
);

router.delete(
  '/',
  celebrate(deleteSchema, joiOptions),
  authMiddleware,
  productsController.handleDelete,
);

router.get(
  '/markup',
  authMiddleware,
  markupController.handleGet,
);

module.exports = router;
