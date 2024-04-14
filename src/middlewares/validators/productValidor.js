import Joi from 'joi';

const schemas = Joi.object({
    title: Joi.string().required(),
    color: Joi.string().empty(''),
    description: Joi.string().empty(''),
    price: Joi.number().required(),
})
export default schemas;
