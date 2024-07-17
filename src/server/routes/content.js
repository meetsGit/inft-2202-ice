import express from 'express';
export const contentRouter = express.Router();

/*
* Start defining our routes.
*/
contentRouter.get('/', (request, response, next) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('main index');
});

contentRouter.get('/about', (request, response, next) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('about');
});

contentRouter.get('/contact', (request, response, next) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('contact');
});


export default contentRouter;