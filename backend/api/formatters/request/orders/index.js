const bcrypt = require('bcryptjs');
const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const orderRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    let {
      status,
      orderdate,
      deliverydate,
      userid,
      supplierid,
    } = reqParams.body;

    if ( !_.isEmpty(reqParams.body) ) {
      formattedParams = _.merge(
        formattedParams,
        {
          status,
          orderDate: orderdate,
          deliveryDate: deliverydate,
          userId: userid,
          supplierId: supplierid,
        },
      );
    }
    console.log('--------------------------', formattedParams, reqParams.body)

    return formattedParams;
  },
};

module.exports = orderRequestFormatter;
