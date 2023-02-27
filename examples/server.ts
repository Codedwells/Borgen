import express from 'express'
import { Logger,Borgen } from '../lib/Borgen';

const app = express();
app.use(
    Borgen({
        methodColor:{
        GET:'greenBright',
        POST:'yellow',
        PUT:'gray',
        PATCH:'gray',
        DELETE:'redBright'
        },
        routeColor:'gray',
        statusColor:'cyan',
        resTimeColor:'gray',
        statusCodesCl:{serverErr:'red', clientErr:'yellow', redirects:'cyan',success:'greenBright'
        }})
);

app.get('/test', (req, res) => {
    Logger.warn({ message: 'This is an warning', infoColor: 'yellow', messageColor: 'yellowBright' });
    res.send('Hello world').end();
});

app.get('*', (req, res) => {
    Logger.error({ message: 'This route does not exist', infoColor: 'red', messageColor: 'redBright' });
    res.send('404 not found');
});

app.listen('3001', () => {
    Logger.info({ message: 'The server is running on port '});
});
