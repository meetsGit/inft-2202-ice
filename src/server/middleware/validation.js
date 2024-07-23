import { validationResult } from "express-validator";
import { conflictError} from "../errors/ConflictError.js";
function doValidation (request, response, next) 
{
    const result = validationResult(request);
    if (result.isEmpty()) {
        return next();
    }
    
    const errOBJ = { errors: result.array() }
    // response.status(409).json();
    next( new conflictError('Input Validation Failed', errOBJ))
}

export function CheckValidation(rules){
    return [rules, doValidation]
}