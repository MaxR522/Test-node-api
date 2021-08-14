/**
 * LOAD ALL ENV VARIABLES
 */

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = require('dotenv').config();

if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const PORT = process.env.PORT || 4242;
const MONGO_URI = process.env.MONGODB_URI || '';

export default {
  // environment
  env: process.env.NODE_ENV,

  // Define port
  port: PORT,

  // MongoDB URI
  mongoDBURI: MONGO_URI,

  // JWT variables
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,

  // CORS Config
  corsOption: {
    origin: process.env.ORIGIN,
    // allowedHeaders: '',
    // exposedHeaders: '',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  },
};
