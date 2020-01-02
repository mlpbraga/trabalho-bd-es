const { Router } = require('express');
const ordersController = require('../../controllers/orders');
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
  ordersController.handleGet,
);

router.post(
  '/',
  authMiddleware,
  ordersController.handlePost,
);

router.put(
  '/',
  authMiddleware,
  ordersController.handlePut,
);

router.delete(
  '/',
  authMiddleware,
  ordersController.handleDelete,
);

module.exports = router;
