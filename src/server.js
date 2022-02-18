const express = require('express');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(router);

const PORT = 3001;
app.listen(PORT, () => console.log(`On at: ${PORT}!`));
