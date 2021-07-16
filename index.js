const express = require('express');

const app = express();
const {config} = require('./config/index');
const moviesApi = require('./routes/routes');

moviesApi(app);

// app.get('/anio/:fecha', (req, res) => {
//     let fecha = new Date(res.params.fecha);
//     res.json({fecha:fecha});
// });

app.listen(config.port, () => {
    console.log('Listening in port http://localhost:'+config.port);
})