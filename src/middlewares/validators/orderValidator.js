import Joi from 'joi';

const schemas = Joi.object({
    totalSumma: Joi.number().required(),
    totalQuantity: Joi.number().required(),
    payment: Joi.number().required(),
    ordered_products: Joi.array().items(
        Joi.object({
            product_id: Joi.string().required(),
            price: Joi.number().required(),
            amount: Joi.number().required(),
            summa: Joi.number().required(),
        })
    )
})
export default schemas;
