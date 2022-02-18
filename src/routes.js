const { Router } = require('express');
const ctrll = require('./layers/controllers/ingredientsController');

const router = Router();

router.post('/ingredient/new', ctrll.ingredientRegister);

module.exports = router;
