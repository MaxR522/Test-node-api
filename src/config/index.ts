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

const env = process.env.NODE_ENV;
const port = process.env.PORT || 4242;

// Change to DB test for testing environment
if (env === 'test') {
  process.env.MONGOOSE_URL = process.env.MONGODB_URI_TEST;
} else {
  process.env.MONGOOSE_URL = process.env.MONGODB_URI;
}

const mongoDBURI = process.env.MONGOOSE_URL || '';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'myaccesstoken';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'myRefreshToken';
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '24h';
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '60d';

export default {
  // environment
  env,

  // Define port
  port,

  // MongoDB URI
  mongoDBURI,

  // JWT variables
  accessTokenSecret,
  accessTokenExpiry,
  refreshTokenSecret,
  refreshTokenExpiry,

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
