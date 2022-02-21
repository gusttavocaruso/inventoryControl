const { Router } = require('express');
const router = Router();

const auth = require('./layers/middlewares/auth');
const logCtrll = require('./layers/controllers/loginController');
const ingrCtrll = require('./layers/controllers/ingredientsController');
const prodCtrll = require('./layers/controllers/productController');

router.post('/login', logCtrll.signIn);

router.post('/ingredient/new', auth, ingrCtrll.ingredientRegister);
router.get('/ingredients', ingrCtrll.ingredientsSearch);
router.get('/ingredients/:id', ingrCtrll.ingredientSearchById);

router.post('/product/new', auth, prodCtrll.productRegister);
router.get('/products', prodCtrll.productsSearch);


module.exports = router;
