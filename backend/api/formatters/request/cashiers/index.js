const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const cashierRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    const {
      number,
      type,
      status,
      storeid,
    } = reqParams.body;

    if ( !_.isEmpty(reqParams.body) ) {
      formattedParams = _.merge(
        formattedParams,
        {
          number,
          type,
          status,
          storeId: storeid,        
        },
      );
    }

    return formattedParams;
  },
};

module.exports = cashierRequestFormatter;
