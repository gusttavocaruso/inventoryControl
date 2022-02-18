const { Router } = require('express');
const { ingredientRegister } = require('./layers/controllers/ingredientsController');
const { productRegister } = require('./layers/controllers/productController');

const router = Router();

router.post('/ingredient/new', ingredientRegister);

router.post('/product/new', productRegister);

module.exports = router;
