import 'express';

declare module 'express' {
  interface Request {
    userData?: any;
    token?: any;
  }
}
