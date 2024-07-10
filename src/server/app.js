import express from 'express';
import expRou from './routes/router.js';
import aniRou from './routes/animals.js';

const exp = express();

// Middleware to parse JSON bodies
exp.use(express.json());

// Use the main router
exp.use(expRou);

// Use the animal router
exp.use(aniRou);

exp.listen(3000, () => {
    console.log(`server running at localhost:3000`);
});


