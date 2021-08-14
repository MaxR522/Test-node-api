import 'express';

declare module 'express' {
  interface Request {
    userData?: any;
  }
}
