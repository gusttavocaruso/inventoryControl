const srvc = require('../services/saleService');

const newSale = async (req, res, next) => {
  try {
    const saleData = req.body;
    const sale = await srvc.saleNew(saleData);

    return res.status(201).json(sale);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  newSale,
};
