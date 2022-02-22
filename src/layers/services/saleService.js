const prodMdl = require('../models/productsModel');
const ingrMdl = require('../models/ingredientsModel');
const vldt = require('../../utils/validtFuncs');

const saleNew = async ({ product, quantity }) => {
  const { ingredients } = await prodMdl.getProductByName(product);

  const ingrdtsOnPrdct = Object.keys(ingredients);
  const ingrRequiredQnty = Object.values(ingredients);

  // recupera do estoque, ingredientes do produto
  const actualIngredientsStock = await Promise
    .all(ingrdtsOnPrdct
      .map(async (ingr) => await ingrMdl
        .getIngredientByName(ingr)));

  // recupera quantidade dos ingredientes em estoque
  const ingrdStockQnty = actualIngredientsStock
    .map(({ stockQnty }) => stockQnty);

  // verifica se a quantidade de ingredientes necessárias para produzir os produtos que serão vendidos esta disponível no estoque
  const ingrdAvailable = ingrdStockQnty
    .map((iSQ, i) => ingrRequiredQnty
      .map((iQ, j) => i === j ? (iSQ - (iQ * quantity)) : false));

  vldt.stockAvailableValidation(ingrdAvailable);

  console.log(ingrdStockQnty);
  console.log(ingrRequiredQnty);
  console.log(ingrdAvailable);
};

module.exports = {
  saleNew,
};
