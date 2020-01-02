const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const productRequestFormatter = {
  format(reqParams) {
    const { store } = reqParams.query;
    const {
      name,
      unitformat,
    } = reqParams.body;
    let formattedParams = BaseRequestFormatter.format(reqParams);
    
    if ( !_.isEmpty(reqParams.body) ||  store) {
      formattedParams = _.merge(
        formattedParams,
        {
          name,
          unitFormat: unitformat,
          store,
        },
      );
    }

    return formattedParams;
  },
};

module.exports = productRequestFormatter;
