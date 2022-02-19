const { Router } = require('express');
const { ingredientRegister, ingredientsSearch,
 } = require('./layers/controllers/ingredientsController');
const { productRegister } = require('./layers/controllers/productController');

const router = Router();

router.post('/ingredient/new', ingredientRegister);
router.get('/ingredients', ingredientsSearch);

router.post('/product/new', productRegister);

module.exports = router;
