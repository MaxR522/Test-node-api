import 'chai-http';
import * as chai from 'chai';
import app from '../src/index';

import 'express';
require('dotenv').config();

// Assertion
const should = chai.should();
const expect = chai.expect;
chai.use(require('chai-http'));

export { should, chai, app, expect };
