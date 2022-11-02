import Joi from 'joi';
import 'joi-extract-type';

const requiredMessage = 'All fields must be filled';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().empty()
    .messages({
      'any.required': requiredMessage,
      'string.empty': requiredMessage,
    }),
  password: Joi.string().min(6).required().empty()
    .messages({
      'any.required': requiredMessage,
      'string.empty': requiredMessage,
    }),
});

export const createUserSchema = Joi.object({
  username: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});
