import express from 'express';
import AnimalsCreateController from '../controller/animals/create.js';
import AnimalsRetrieveController from '../controller/animals/retrieve.js';
import updateAnimalController from '../controller/animals/update.js';
import deleteAnimalController from '../controller/animals/delete.js';
import AnimalSearchController from '../controller/animals/search.js';
import { CheckValidation } from '../middleware/validation.js';

export const animalRouter = express.Router();

// Search
animalRouter.get(
    '/animals',
    CheckValidation(AnimalSearchController.rules),
    AnimalSearchController.handle);

// create
animalRouter.post('/animals',
    CheckValidation(AnimalsCreateController.rules),
    AnimalsCreateController.handle);

// Retrieve a single animal by ID
animalRouter.get('/animals/:animalID', AnimalsRetrieveController.handle);

// Update an animal by ID
animalRouter.put('/animals/:animalID',
    CheckValidation(updateAnimalController.rules),
 updateAnimalController.handle);

// Delete an animal by ID
animalRouter.delete('/animals/:animalID', deleteAnimalController.handle);

// Search for animals (example: using query parameters)
animalRouter.get('/animals/search/:q', (request, response) => {
    const searchQuery = request.params.q;
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end(`Search animals with query: ${searchQuery}`);
});

export default animalRouter;
