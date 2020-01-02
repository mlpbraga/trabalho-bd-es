const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const cashierproductRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    const {
      selldate,
      cashierid,
      sells,
    } = reqParams.body;
    let insertSells;
    if (sells) {
      insertSells = sells.map((sell) => ({
        cashierId: cashierid,
        productId: sell.productId,
        sellout: sell.sellout,
        sellDate: selldate,
        quantity: sell.quantity,
      }));
    }
    
    if ( !_.isEmpty(reqParams.body) ) {
      formattedParams = _.merge(
        formattedParams,
        {
          insertSells        
        },
      );
    }

    return formattedParams;
  },
};

module.exports = cashierproductRequestFormatter;
