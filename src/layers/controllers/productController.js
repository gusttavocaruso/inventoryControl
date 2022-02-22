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

const productsSearch = async (_req, res, next) => {
  try {
    const products = await srvc.searchProducts();

    return res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const productSearchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await srvc.searchProductById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const productImageAdd = async (req, res, next) => {
  try {
    const { id } = req.params;
    await srvc.addProductImage(id);

    return res.status(200).json({ message: 'image already add'});
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};


module.exports = {
  productRegister,
  productsSearch,
  productSearchById,
  productImageAdd,
};
