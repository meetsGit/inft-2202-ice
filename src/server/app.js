import express from 'express';
import router from './routes/router.js';
import animalRouter from './routes/animals.js';
import mongoose from 'mongoose';

const PORT = 3000;

// create new instance of http server
const server = express();

server.use(express.json());

// Middleware to parse JSON bodies
server.use(express.json());

// Use the main router
server.use(router);

// autimatically serve static files 
const localDir = import.meta.dirname;
server.use(express.static(`${localDir}/../client`));
server.use('/node_modules',express.static(`${localDir}/../../node_modules`))

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



