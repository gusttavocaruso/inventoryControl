const express = require('express');
const router = require('./routes');
const err = require('../src/layers/middlewares/err');

const app = express();
app.use(express.json());

app.use(router);
app.use(err);

const PORT = 3001;
app.listen(PORT, () => console.log(`On at: ${PORT}!`));

module.exports = app;
