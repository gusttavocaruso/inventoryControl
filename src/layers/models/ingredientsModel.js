const connect = require('./connection');

const postIngredient = async (ingredientData) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('ingredients')
    .insertOne({ ...ingredientData });
  return insertedId;
};

module.exports = {
  postIngredient,
};
