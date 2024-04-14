import Joi from 'joi';

const schemas = { 
  create: Joi.object({ 
    username: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    role: Joi.string().allow('user', 'admin').required(),
    address: Joi.string().empty(''),
  }),
  update: Joi.object({ 
    username: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().empty(''),
    role: Joi.string().allow('user', 'admin').required(),
    address: Joi.string().empty(''),
  }) 
  // define all the other schemas below 
}; 
export default schemas;
