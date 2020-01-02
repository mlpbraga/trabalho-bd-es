const bcrypt = require('bcryptjs');
const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const userRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    let {
      username,
      password,
      employeeid,
    } = reqParams.body;

    if (password) {
      password = bcrypt.hashSync(password);
    }

    if ( !_.isEmpty(reqParams.body) ) {
      formattedParams = _.merge(
        formattedParams,
        {
          username,
          employeeId: employeeid,
          password,
        },
      );
    }

    return formattedParams;
  },
};

module.exports = userRequestFormatter;
