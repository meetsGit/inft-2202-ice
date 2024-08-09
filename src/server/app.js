import express from 'express';
import router from './routes/router.js';
import path from 'path';
import mongoose from 'mongoose';

// import logging stuff
import { LoggingMiddleware } from './middleware/logging.js';
import { logger } from './utils/logger.js';
import { errorHandlingMiddleware } from './middleware/errorHandling.js';


// import our new router file

const PORT = 3000;

// create new instance of http server
const server = express();

server.use(express.json());

// Middleware to parse JSON bodies
server.use(express.json());

// tell the server to use the logging middleware
server.use(LoggingMiddleware);

// Use the main router
server.use(router);

// autimatically serve static files 
const localDir = import.meta.dirname;
server.use(express.static(`${localDir}/../../dist`));
server.use('/node_modules',express.static(`${localDir}/../../node_modules`))
server.get('*', (req, res, next) => {
    res.sendFile(path.resolve(import.meta.dirname + '/../../dist/index.html'));
})

server.use(errorHandlingMiddleware)
    
try{
    // try to connect to the database
    await mongoose.connect('mongodb://localhost:27017/inft2202');
    console.log('connected to the database');
    // start the server
    server.listen(3000, () => {
    console.log(`server running at on port ${PORT}`);
});
}
catch (error) {
    console.log(error);
    process.exit(1);
}



