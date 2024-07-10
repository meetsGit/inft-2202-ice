import express from 'express';

export const aniRou = express.Router();

// Create an animal
aniRou.post('/animals', (request, response) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('Animal Created');
});

// Retrieve all animals
aniRou.get('/animals', (request, response) => {
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end('search animal');
});

// Retrieve a single animal by ID
aniRou.get('/animals/:id', (request, response) => {
    const animalId = request.params.id;
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end(`Find animal with id: ${animalId}`);
});

// Update an animal by ID
aniRou.put('/animals/:id', (request, response) => {
    const animalId = request.params.id;
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end(`Update animal with ID: ${animalId}`);
});

// Delete an animal by ID
aniRou.delete('/animals/:id', (request, response) => {
    const animalId = request.params.id;
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end(`Delete animal with ID: ${animalId}`);
});

// Search for animals (example: using query parameters)
aniRou.get('/animals/search/:q', (request, response) => {
    const searchQuery = request.params.q;
    const headers = {'Content-Type': 'text/plain'}
    response.writeHead(200, headers);
    response.end(`Search animals with query: ${searchQuery}`);
});

export default aniRou;
