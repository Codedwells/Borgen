const express = require('express');
const { Logger, Borgen } = require('borgen');

const app = express();
app.use(
    Borgen({
        methodColor: {
            GET: 'greenBright',
            POST: 'yellow',
            PUT: 'gray',
            PATCH: 'gray',
            DELETE: 'redBright'
        },
        routeColor: 'gray',
        statusColor: 'cyan',
        resTimeColor: 'gray',
        statusCodesCl: { serverErr: 'red', clientErr: 'yellow', redirects: 'cyan', success: 'greenBright' },
        logs: './logs/borgen.log'
    })
);

app.get('/test', (req, res) => {
    Logger.warn({ message: 'This is an warning', infoColor: 'yellow', messageColor: 'yellowBright', logs: './logs/warnings.log' });
    res.send('Hello world').end();
});

app.get('*', (req, res) => {
    Logger.error({ message: 'This route does not exist', infoColor: 'red', messageColor: 'redBright', logs: './logs/error.log' });
    res.send('404 not found');
});

app.listen('3001', () => {
    Logger.info({ message: 'The server is running on port ', logs: './logs/info.log' });
});
