const { Router } = require('express');
const router = Router();

const auth = require('./layers/middlewares/auth');
const imgUp = require('./layers/middlewares/imageUp');

const logCtrll = require('./layers/controllers/loginController');
const ingrCtrll = require('./layers/controllers/ingredientsController');
const prodCtrll = require('./layers/controllers/productController');
const saleCtrll = require('./layers/controllers/saleController');

router.post('/login', logCtrll.signIn);

router.post('/ingredient/new', auth, ingrCtrll.ingredientRegister);
router.get('/ingredients', ingrCtrll.ingredientsSearch);
router.get('/ingredients/:id', ingrCtrll.ingredientSearchById);

router.post('/product/new', auth, prodCtrll.productRegister);
router.get('/products', prodCtrll.productsSearch);
router.get('/products/:id', prodCtrll.productSearchById);
router.put('/products/:id/image', auth, imgUp, prodCtrll.productImageAdd);

router.post('/sales/new', saleCtrll.newSale);


module.exports = router;
