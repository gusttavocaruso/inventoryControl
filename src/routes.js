const { Router } = require('express');
const router = Router();

const ingrCtrll = require('./layers/controllers/ingredientsController');
const prodCtrll = require('./layers/controllers/productController');


router.post('/ingredient/new', ingrCtrll.ingredientRegister);
router.get('/ingredients', ingrCtrll.ingredientsSearch);

router.post('/product/new', prodCtrll.productRegister);
router.get('/products', prodCtrll.productsSearch);


module.exports = router;
