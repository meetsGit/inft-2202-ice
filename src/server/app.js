import express from 'express';
import expRou from './routes/router.js';
import aniRou from './routes/animals.js';
import mongoose from 'mongoose';

const PORT = 3000;
const exp = express();

// create new instance of http server
const server = express();

server.use(express.json());

// Middleware to parse JSON bodies
exp.use(express.json());

// Use the main router
exp.use(expRou);

// Use the animal router
exp.use(aniRou);

try{
    // try to connect to the database
    await mongoose.connect('mongodb://localhost:27017/inft2202');
    console.log('connected to the database');
    // start the server
    exp.listen(3000, () => {
    console.log(`server running at on port ${PORT}`);
});
}
catch (error) {
    console.log(error);
    process.exit(1);
}



