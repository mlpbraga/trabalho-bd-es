const bcrypt = require('bcryptjs');
const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const supplierRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    const {
      name,
      address,
    } = reqParams.body;

    formattedParams = _.merge(
      formattedParams,
      {
        name,
        address,
      },
    );
    return formattedParams;
  },
};

module.exports = supplierRequestFormatter;
