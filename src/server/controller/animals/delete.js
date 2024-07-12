import Animal from '../../models/Animals.js';

const handle = async (request, response, next) => {
    try {
        const animal = await Animal.findOneAndDelete({ _id: request.params.animalID });
        response.json({ message: 'Animal deleted successfully', animal });
    } catch (error) {
        next(error);
    }
};

export default { handle };
