const connect = require('./connection');

const postProduct = async (productData) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('products')
    .insertOne({ ...productData });
  return insertedId;
};

const getProducts = async () => {
  const db = await connect();
  const products = await db
    .collection('products')
    .find().toArray();
  return products;
};

module.exports = {
  postProduct,
  getProducts,
};
