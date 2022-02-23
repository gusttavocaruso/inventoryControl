<div align="center">

  ## Teste técnico para Pro-Franchising
  Este repositório contém o código fonte de API para controle de estoque desenvolvido por Gustavo Caruso em node.js. 

</div>

#

## Para rodar esse projeto na sua máquina:

- Clone esse repositório e instale as dependencias com um gerenciador de pacotes de sua escolha - `npm`, `yarn`;

- Instale o banco de dados `mongodb` OU rode um container com sua imagem com docker.

- Para iniciar o servidor rode o comando `npm start` ou `npm run dev`. Ele rodará na porta :3001;

- O projeto contém testes de integração. Para ter acesso aos testes, verifique a pasta `./tests` ou rode o comando `npm test`;

#

Esse projeto não tem front-end, por isso, para acessar todas as rotas utilize um client como 
<a target="_blank" href="https://insomnia.rest/">Insomnia</a>, <a target="_blank" href="https://www.postman.com/">Postman</a> ou similar.

As rotas disponíveis são:

###  1. http://localhost:3001/login - requisição HTTP: `POST` <br>
  Esse endpoint faz o login no sistema. Ela deve recer um JSON no formato:

```json
  {
    "username": "owner",
    "password": "admin123"
  }
```

###  2. http://localhost:3001/ingredient/new - requisição HTTP: `POST` <br>
  Esse endpoint cria um novo ingrediente. Para acessar essa rota é necessário estar logado. Ela deve recer um JSON no formato:

```json
  {
    "name": "string",
    "unitValue": 0,
    "unitMeasur": "kg or unity",
    "stockQnty": 0
  }
```

###  3. http://localhost:3001/ingredients - requisição HTTP: `GET` <br>
  Esse endpoint busca os ingredientes criados.

###  4. http://localhost:3001/ingredients/:id - requisição HTTP: `GET` <br>
  Esse endpoint busca um ingrediente específico, indicado pelo ID que deve estar na rota onde `/:id`

###  5. http://localhost:3001/product/new - requisição HTTP: `POST` <br>
  Esse endpoint cria um novo produto. Para acessar essa rota é necessário estar logado. Ela deve recer um JSON no formato:

```json
  {
    "name": "string",
    "salePrice": 0,
    "ingredients": {
      "nome-ingrediente": 0,
      "nome-ingrediente": 0
    }
  }
```

###  6. http://localhost:3001/products - requisição HTTP: `GET` <br>
  Esse endpoint busca os produtos criados.

###  7. http://localhost:3001/products/:id - requisição HTTP: `GET` <br>
  Esse endpoint busca um produto específico, indicado pelo ID que deve estar na rota onde `/:id`

###  8. http://localhost:3001/products/:id/image - requisição HTTP: `PUT` <br>
  Esse endpoint adiciona uma imagem à um produto específico, indicado pelo ID que deve estar na rota onde `/:id`. Para acessar essa rota é necessário estar logado.

#

Esse projeto utiliza as depêndencias diretas:
- `express` - framework para construção de servidores web e requisições HTTP,
- `mongodb` - banco de dados noSQL,
- `@hapi/joi` - lib de validação de dados;
- `jsonwebtoken` - lib de geração de token;
- `multer` - lib de upload de imagem;

e também, as depêndencias de desenvolvimento:
- `nodemon` - lib p/ exercutar servidor ininterruptamente ,
- `mocha` - lib p/ teste,
- `chai` - lib p/ teste,
- `chai-http` - lib p/ teste,
- `sinon` - lib p/ teste,
- `mongodb-memory-server@6` - lib que simula banco de dados p/ teste;

#

## Solicitação do Cliente:

Situação:

Um cliente chegou na loja e comprou 5 cookies. O barista olhou o pedido e ficou desesperado, havia somente 2 cookies na loja.
Ele teve que explicar ao cliente o ocorrido e o cliente foi embora, essa situação não aconteceria se o pessoal do TI estivesse controlado o estoque.

Sobre:

Você foi designado a resolver esse problema e precisa estruturar todo sistema de estoque e produtos para evitar acontecer novamente.

Requisitos:

O estoque nada mais é que controlar quantos ingredientes tem na loja, além de cookie em uma cafeteria tem outros ingredientes como café em pó, leite, entre outros.
Para organizar melhor crie uma estrutura de ingrediente com nome, unidade de medida e preço unitario.

Antes de ter um estoque você precisa ter um produto com algumas coisas basicas que o cliente precisa saber como: nome, imagem, preço e os ingredientes que esse produto tem. 
Porém temos um problema aqui, o ingrediente é só uma referencia a o que foi usado ele não tem quantidade, então você precisa fazer um novo objeto que faça referência a esse ingrediente com a quantidade que é usado, nós chamamos de componente.

Agora você já tem as informações basicas para controlar o estoque, organize em um objeto para que o cliente consiga visualizar os ingredientes da loja e quanto tem de estoque atualmente.

Ufa, tudo pronto, mas ainda o problema não foi resolvido, você só esta controlando quanto tem, faça uma rota de verificação para saber se o produto X pode ser vendido. 

Como você não tem acesso ao PDV faça uma rota de controle manual para o dono da loja imputar os valores do estoque.

O dono é quem cadastra todas as informações da loja, inclusive o upload da imagem, então será necessario uma rota para CRUD dessas informações.
Além disso alterar as informações é restrito então essas rotas especificas precisa de um login para controlar.

Situação resolvida, agora o cliente pediu novas alterações, como sempre. Ele precisa de um relatório para saber o custo dos produtos, você tem essas informações de quanto custa o ingrediente e de quanto vai no produto.
Precisamos de uma rota que retorne todos os produtos e o custo de cada um.

Observações técnicas:
- Validar todos os campos para ninguem quebrar a loja
- Login precisa ser criptografado a senha
- Documentar para entendimento do código. (comentar algumas coisas explicando)
- Tratar erros corretamente (404 para não encontrado), (200 | 202 para OK), etc
