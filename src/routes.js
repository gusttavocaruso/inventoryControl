const { Router } = require('express');

const { ingredientRegister, ingredientsSearch,
 } = require('./layers/controllers/ingredientsController');

 const { productRegister, productsSearch,
 } = require('./layers/controllers/productController');

const router = Router();

router.post('/ingredient/new', ingredientRegister);
router.get('/ingredients', ingredientsSearch);

router.post('/product/new', productRegister);
router.get('/products', productsSearch);

module.exports = router;
