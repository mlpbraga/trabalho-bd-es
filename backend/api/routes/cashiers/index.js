const { celebrate } = require('celebrate');
const { Router } = require('express');
const {
  getSchema,
  postSchema,
  putSchema,
  deleteSchema,
} = require('./validation');
const cashiersController = require('../../controllers/cashiers');
const cashiersproductsController = require('../../controllers/cashiers/products');
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
  cashiersController.handleGet,
);

router.post(
  '/',
  celebrate(postSchema, joiOptions),
  authMiddleware,
  cashiersController.handlePost,
);

router.put(
  '/',
  celebrate(putSchema, joiOptions),
  authMiddleware,
  cashiersController.handlePut,
);

router.delete(
  '/',
  celebrate(deleteSchema, joiOptions),
  authMiddleware,
  cashiersController.handleDelete,
);

router.get(
  '/products',
  celebrate(getSchema, joiOptions),
  // authMiddleware,
  cashiersproductsController.handleGet,
);

router.post(
  '/products',
  // celebrate(postSchema, joiOptions),
  authMiddleware,
  cashiersproductsController.handlePost,
);

router.put(
  '/products',
  celebrate(putSchema, joiOptions),
  authMiddleware,
  cashiersproductsController.handlePut,
);

router.delete(
  '/products',
  celebrate(deleteSchema, joiOptions),
  authMiddleware,
  cashiersproductsController.handleDelete,
);

module.exports = router;
