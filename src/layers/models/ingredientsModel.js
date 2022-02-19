const connect = require('./connection');

const postIngredient = async (ingredientData) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('ingredients')
    .insertOne({ ...ingredientData });
  return insertedId;
};

const getIngredients = async () => {
  const db = await connect();
  const ingredients = await db
    .collection('ingredients')
    .find().toArray();
  return ingredients;
};

module.exports = {
  postIngredient,
  getIngredients,
};
