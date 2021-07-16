

const express = require('express');
const app = express();

const { config } = require('./config/index');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/json', (req, res) => {
    res.json({hello: 'world'})
});

app.listen(config.port, ()=>{
    console.log('Listenin http://localhost:'+config.port);
})