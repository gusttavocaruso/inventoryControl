const srvc = require('../services/productsService');

const productRegister = async (req, res, next) => {
  try {
    const productData = req.body;
    const id = await srvc.registerProduct(productData);

    return res.status(201).json({ id, ...productData });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  productRegister,
};
