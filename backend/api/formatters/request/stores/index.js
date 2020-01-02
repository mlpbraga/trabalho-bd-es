const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const userRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    const {
      name,
      address,
    } = reqParams.body;
    const { date } = reqParams.query;
    if ( !_.isEmpty(reqParams.body) || date ) {
      formattedParams = _.merge(
        formattedParams,
        {
          name,
          address,   
          date,   
        },
      );
    }
    return formattedParams;
  },
};

module.exports = userRequestFormatter;
