const { celebrate } = require('celebrate');
const { Router } = require('express');
const {
  getSchema,
  postSchema,
  putSchema,
  deleteSchema,
} = require('./validation');
const suppliersController = require('../../controllers/suppliers');
const suppliersproductsController = require('../../controllers/suppliers/products');
const authValidation = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });


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
  authMiddleware,
  suppliersController.handleGet,
);

router.post(
  '/',
  authMiddleware,
  suppliersController.handlePost,
);

router.put(
  '/',
  authMiddleware,
  suppliersController.handlePut,
);

router.delete(
  '/',
  authMiddleware,
  suppliersController.handleDelete,
);

router.get(
  '/products',
  authMiddleware,
  suppliersproductsController.handleGet,
);

router.post(
  '/products',
  authMiddleware,
  suppliersproductsController.handlePost,
);

router.put(
  '/products',
  authMiddleware,
  suppliersproductsController.handlePut,
);

router.delete(
  '/products',
  authMiddleware,
  suppliersproductsController.handleDelete,
);

module.exports = router;
