import { createError } from '../utils/error.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    const validData = await schema.parseAsync(req.body);
    req.body = validData; // Replace with validated data
    next();
  } catch (error) {
    const validationErrors = {};
    
    error.errors.forEach((err) => {
      validationErrors[err.path[0]] = err.message;
    });
    
    next(createError(400, 'Validation failed', validationErrors));
  }
};