// import entryP from './credentials/env';
const http = require('http');

const app = require('./app');

const chalk = require('chalk');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const statusCode = require('http').STATUS_CODES;
const statusCodeOk = statusCode['200'];

console.log(statusCodeOk);

console.log(chalk.green(
    'Project is now being served on port ' +
    chalk.blue.underline.bold(port) +
    '\n\r or click ' + chalk.blue.underline.bold(`http://localhost:${port}`)
));
server.listen(port);