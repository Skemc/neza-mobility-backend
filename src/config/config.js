import 'dotenv/config';

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url:
      process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URL_PROD
        : process.env.MONGO_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  redis: {
    url:
      process.env.NODE_ENV === 'production'
        ? process.env.REDIS_URL_PROD
        : process.env.REDIS_URL,
    port:
      process.env.NODE_ENV === 'production'
        ? process.env.REDIS_PORT_PROD
        : process.env.REDIS_PORT,
    password:
      process.env.NODE_ENV === 'production'
        ? process.env.REDIS_PASSWORD_PROD
        : process.env.REDIS_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes:
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  email: {
    smtp: {
      service: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
};
