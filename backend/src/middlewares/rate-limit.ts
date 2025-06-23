import { RateLimit } from 'koa2-ratelimit';
import type { Core } from '@strapi/strapi';
import { Context, Next } from 'koa';

export default ({ config, strapi }: { config: any; strapi: Core.Strapi }) => {
  return async (ctx: Context, next: Next) => {
    if (ctx.path === '/api/about') {
      return next();
    }
    return RateLimit.middleware({
      interval: { min: 5 }, // 5 minutes
      max: 10000000, // limit each IP to 500 requests per interval
      message: 'Too many requests, please try again later.',
      headers: true,
    })(ctx, next);
  };
};
