import express from 'express';
import AnimalsCreateController from '../controller/animals/create.js';
import AnimalsRetrieveController from '../controller/animals/retrieve.js';
import updateAnimalController from '../controller/animals/update.js';
import deleteAnimalController from '../controller/animals/delete.js';
export const aniRou = express.Router();

// create
aniRou.post('/animals', AnimalsCreateController.handle);

// Retrieve a single animal by ID
aniRou.get('/animals/:animalID', AnimalsRetrieveController.handle);


// Update an animal by ID
aniRou.put('/animals/:animalID', updateAnimalController.handle);

// Delete an animal by ID
aniRou.delete('/animals/:animalID', deleteAnimalController.handle);

// Search for animals (example: using query parameters)
aniRou.get('/animals/search/:q', (request, response) => {
    const searchQuery = request.params.q;
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end(`Search animals with query: ${searchQuery}`);
});

export default aniRou;
