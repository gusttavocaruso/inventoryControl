const connect = require('./connection');

const postProduct = async (productData) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('products')
    .insertOne({ ...productData });
  return insertedId;
};

module.exports = {
  postProduct,
};
