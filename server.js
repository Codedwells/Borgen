const express = require('express');

const { Logger, Borgen } = require('./lib/Borgen');

const app = express();
app.use(Borgen);

app.get('/test', (req, res) => {
    Logger.warn('New call to /api');
    res.send('Hello world').end();
});

app.get('*', (req,res) => {
    Logger.error('This is route does not exist');
    res.send('404 not found');
});

app.listen('3001', () => {
    Logger.info(`Server is listening on port:3001`);
});
