const { ObjectId } = require('mongodb');
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

const getIngredientById = async (id) => {
  const db = await connect();
  const ingredient = await db
    .collection('ingredients')
    .findOne({ _id: ObjectId(id) });
  return ingredient;
};

module.exports = {
  postIngredient,
  getIngredients,
  getIngredientById,
};
