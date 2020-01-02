const logger = require('../../../utils/logger');
const { db, sequelize } = require('../../../database/models');

module.exports = {
  async handleGet(req, res, next) {
    let response;
    const { month, year } = req.query;
    let nextMonth;
    let nextYear;
    if (parseInt(month) !== 12) {
      nextMonth = parseInt(month) + 1
      nextYear = year;
    } else {
      nextMonth = 1;
      nextYear = parseInt(year);
    }

    try {
      response = await sequelize.query(
        `
        with best_markup as (
          select (cp.quantity*cp.sellout) - (sp.sellin*cp.quantity) as markup,
                 cp."productId",
                 "sellDate"::date
          from cashierproducts cp
              join supplierproducts sp
                  on cp."productId"=sp."productId"
          where (cp.quantity*cp.sellout) >= (sp.sellin*cp.quantity)
          )
          
          select sum(markup) as markup,
                 max("sellDate"::date) as lastsale,
                 "productId",
                 name
          from best_markup
              join products on "productId"=products.id
          where "sellDate" between '${year}-${month}-01' and '${nextYear}-${nextMonth}-01'
          group by ("productId",name)
          order by markup desc limit 10;
        `
      );
      return res.status(200).json(response[0]);
    } catch (error) {
      logger.error(`product Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
