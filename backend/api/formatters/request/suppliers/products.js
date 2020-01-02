const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const supplierRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    const {
      productid,
      supplierid,
      sellin,
    } = reqParams.body;

    formattedParams = _.merge(
      formattedParams,
      {
        productId: productid,
        supplierId: supplierid,
        sellin,
      },
    );
    return formattedParams;
  },
};

module.exports = supplierRequestFormatter;
