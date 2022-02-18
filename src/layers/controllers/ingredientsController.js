const srvc = require('../services/ingredientsService');

const ingredientRegister = async (req, res, next) => {
  try {
    const ingredientData = req.body;
    const id = await srvc.registerIngredient(ingredientData);

    return res.status(200).json({ id, ...ingredientData });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  ingredientRegister,
};
