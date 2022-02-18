const mdl = require('../models/productsModel');
const vldt = require('../../utils/validtFuncs');

const registerProduct = async (productData) => {
  vldt.productEntriesValidation(productData);

  const productId = await mdl.postProduct(productData);
  return productId;
};

module.exports = {
  registerProduct,
};
