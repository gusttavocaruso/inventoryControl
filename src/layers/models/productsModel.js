const { ObjectId } = require('mongodb');
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

const getProductById = async (id) => {
  const db = await connect();
  const product = await db
    .collection('products')
    .findOne({ _id: ObjectId(id) });
  return product;
};

const getProductByName = async (productName) => {
  const db = await connect();
  const product = await db
    .collection('products')
    .findOne({ name: productName })
  return product;
};

module.exports = {
  postProduct,
  getProducts,
  getProductById,
  getProductByName,
};
