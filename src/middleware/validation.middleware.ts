import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from '../exceptions/HttpException';

function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
    return (req, res, next) => {
        validate(plainToClass(type, req.body), { skipMissingProperties })
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object(error.constraints)).join(', '); // Was Object.values... error
                    next(new HttpException(400, message));
                } else {
                    next();
                }
            });
    };
}

export default validationMiddleware;