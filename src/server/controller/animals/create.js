import { response } from 'express';
import Animal from'../../models/Animals.js';

const handle = async (request,response,next) => {
    try{
        const{ name, breed, eyes, legs, sound } = request.body;
        const animal = await Animal.create({
            name,
            breed,
            legs,
            eyes,
            sound
        });
        response.json(animal);
    } 
    catch (error) {
        next(error);
    }  
};
export default {handle};