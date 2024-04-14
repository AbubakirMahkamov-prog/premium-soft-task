import Joi from 'joi';

const schemas = { 
  login: Joi.object({ 
    username: Joi.string().required(),
    password: Joi.string().required()
  }),
  // define all the other schemas below 
}; 
export default schemas;
