export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::helmet',
    config: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
        },
      },
      frameguard: { action: 'deny' },
      hsts: { maxAge: 31536000, includeSubDomains: true },
      noSniff: true,
      referrerPolicy: { policy: 'no-referrer-when-downgrade' },
    },
  },
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://your-portfolio.vercel.app'],
      methods: ['GET', 'OPTIONS'],
      credentials: false,
      maxAge: 86400,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
