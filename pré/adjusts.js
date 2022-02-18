// collection do estoque atual
const stqIngredientes = [
  {
    _id: 1,
    ingredName: 'ovo',
    valorUnit: 0.75,
    uniMedida: 'unidade',
    qntyEmEstoque: 30,
  },
  {
    _id: 2,
    ingredName: 'tapioca',
    valorUnit: 10,
    uniMedida: 'kg',
    qntyEmEstoque: 1
  }
];

// collection dos produtos da loja
const stqProdutos = [
  {
    _id: 1,
    prodName: 'Crepioca',
    imagem: 'crepioca.jpeg',
    preço: 5,
    ingredientes: {
      ovo: 2,
      tapioca: 0.1,
    },
  },
];

// retorno de rota de itens atualmente disponíveis pra venda
const prodDispo = [
  {
    prodName: 'Crepioca',
    imagem: 'crepioca.jpeg',
    preço: 5,
    ingredientes: 'ovo, tapioca',
    availableQnty: 10,
  },
];
