import express from 'express';

export const expRou = express.Router();

/*
* Start defining our routes.
*/
expRou.get('/', (request, response, next) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('main index');
});

expRou.get('/about', (request, response, next) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('about');
});

expRou.get('/contact', (request, response, next) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('contact');
});


export default expRou;