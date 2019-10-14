const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect(process.env.MongoServerString + process.env.MONGO_ATLAS_PW + process.env.MongoClusterString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(chalk.cyan.bold("DB connection successful"))
}).catch((err) => {
    console.log(chalk.red.bold(err))
});

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new Error('Server is running');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;