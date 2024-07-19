import Animal from'../../models/Animals.js';
import { checkSchema } from 'express-validator';

const rules = checkSchema({
    page : {
        isNumeric: true,
        errorMessage: `"page" should be a number!`,
        
    },
    perPage : {
        isNumeric: true,    
        errorMessage: `"perPage" should be a number!`,
        
    }
    
}, ['query']);

const handle = async (request,response,next) => {
    try{
        const { page=1 , perPage = 5} = request.query;

        const where = {};
        const fields = {};
        const opts = {
            skip: (page -1) * perPage,
            limit: perPage,
            sort: {
                createdAt: -1
            }
        };

        const count = await Animal.countDocuments(where);
        const pages =   Math.ceil(count/perPage);

        const pagination = { 
            page: parseInt(page), 
            perPage: parseInt(perPage), 
            count, 
            pages 
        }

        const records = await Animal.find (where, fields, opts);

        response.json({ pagination, records });
                
    } 
    catch (error) {
        next(error);
    }  
};
export default {handle, rules};