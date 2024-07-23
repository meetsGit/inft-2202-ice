import { NotFoundError } from '../../errors/NotFoundError.js';
import Animal from'../../models/Animals.js';

const handle = async (request,response,next) => {
    try{
        const animal = await Animal.findOne({
            _id: request.params.animalID
        });
        if (!animal) {
            throw new NotFoundError('Could not find that animal');
        }
        response.json(animal);
    } 
    catch (error) {
        next(error);
    }  
};
export default {handle};