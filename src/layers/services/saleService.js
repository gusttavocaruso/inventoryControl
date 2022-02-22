const prodMdl = require('../models/productsModel');
const ingrMdl = require('../models/ingredientsModel');
const vldt = require('../../utils/validtFuncs');

const saleNew = async ({ product, quantity }) => {
  const { ingredients } = await prodMdl.getProductByName(product);

  const ingrdtsOnPrdct = Object.keys(ingredients);
  const ingrdtsQnty = Object.values(ingredients);

  // recupera do estoque ingredientes do produto em questão
  const actualStock = await Promise
    .all(ingrdtsOnPrdct
    .map(async (ingr) => await ingrMdl
    .getIngredientByName(ingr)));

  // recupera quantidade dos ingredientes em estoque
  const ingrdStockQnty = actualStock
    .map(({ stockQnty }) => stockQnty);

  // verifica se a quantidade de ingredientes necessárias para produzir os produtos que serão vendidos esta disponível no estoque
  const ingrdAvailable = ingrdStockQnty
    .map((iSQ) => ingrdtsQnty
    .map((iQ) => ((iSQ - iQ) > 0) ? true : false));
  vldt.stockAvailableValidation(ingrdAvailable);

  console.log(ingrdStockQnty);
  console.log(ingrdtsQnty);
  console.log(ingrdAvailable);
};

module.exports = {
  saleNew,
};
