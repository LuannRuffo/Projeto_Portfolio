const express = require('express');
const rotas = require('./rotas');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['get', 'post']
}))
app.use(rotas);

app.listen(3000)