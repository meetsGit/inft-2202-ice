import Animal from '../../models/Animals.js';

const handle = async (request, response, next) => {
    try {
        const { name, breed, eyes, legs, sound } = request.body;
        const animal = await Animal.findOneAndUpdate(
            { _id: request.params.animalID },
            { name, breed, eyes, legs, sound },
            { new: true }
        );
        response.json(animal);
    } catch (error) {
        next(error);
    }
};

export default { handle };
