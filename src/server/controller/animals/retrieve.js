
import Animal from'../../models/Animals.js';

const handle = async (request,response,next) => {
    try{
        const animal = await Animal.findOne({
            _id: request.params.animalID
        });
        response.json(animal);
    } 
    catch (error) {
        next(error);
    }  
};
export default {handle};