import Animal from '../../models/Animals.js';
import { checkSchema } from 'express-validator';

const rules = checkSchema({
    name: {
        isString:true,
        errorMessage: '"name" should be a string'
    },
    breed: {
        isString:true,
        errorMessage: '"breed" should be a string'
    },
    legs: {
        isNumeric:true,
        errorMessage: '"legs" should be a Number'
    },
    eyes: {
        isNumeric:true,
        errorMessage: '"eyes" should be a Number'
    },
    sound: {
        isString:true,
        errorMessage: '"sound" should be a string'
    }
}, ['body']);


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

export default { handle, rules };
