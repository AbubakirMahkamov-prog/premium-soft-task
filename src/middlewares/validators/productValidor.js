import Joi from 'joi';

const schemas = Joi.object({
    title: Joi.string().required(),
    color: Joi.string().empty(''),
    description: Joi.string().empty(''),
    amount: Joi.number().required(),
    price: Joi.number().required(),
})
export default schemas;
