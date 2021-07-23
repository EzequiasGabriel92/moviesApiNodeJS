const express = require('express');

const app = express();
const {config} = require('./config/index');
const moviesApi = require('./routes/routes');
const {
    logErrors,
    wrapErrors,
    errorHandler
} = require("./utils/middleware/errorHandlers");
const notFoundHandler = require("./utils/middleware/notFoundHandler")


//body parser
app.use(express.json())

//routes
moviesApi(app);

//err 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


// app.get('/anio/:fecha', (req, res) => {
//     let fecha = new Date(res.params.fecha);
//     res.json({fecha:fecha});
// });

app.listen(config.port, () => {
    console.log('Listening in port http://localhost:'+config.port);
})