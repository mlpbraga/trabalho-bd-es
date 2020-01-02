const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const userRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    const {
      name,
      rg,
      cpf,
      address,
      phonenumber,
      birthdate,
      role,
      salary,
    } = reqParams.body;

    if ( !_.isEmpty(reqParams.body) ) {
      formattedParams = _.merge(
        formattedParams,
        {
          name,
          rg,
          cpf,
          address,
          phoneNumber: phonenumber,
          birthDate: birthdate,
          role,
          salary,          
        },
      );
    }

    return formattedParams;
  },
};

module.exports = userRequestFormatter;
