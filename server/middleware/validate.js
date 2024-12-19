import { createError } from '../utils/error.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    const validationErrors = {};
    
    error.errors.forEach((err) => {
      validationErrors[err.path[0]] = err.message;
    });
    
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors,
    });
  }
};