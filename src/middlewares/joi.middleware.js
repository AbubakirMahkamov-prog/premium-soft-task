import Joi from 'joi';

const middleware = (schema, property) => {
  return async (ctx, next) => {
    try {
      const { error } = schema.validate(ctx.request.body);
      const valid = error == null;

      if (valid) {
        await next();
      } else {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        
        ctx.status = 422;
        ctx.body = {
          error: message
        };
      }
    } catch (error) {
      // Handle any unexpected errors
      ctx.status = 500;
      ctx.body = {
        error: 'Internal Server Error'
      };
    }
  };
};

export default middleware;
