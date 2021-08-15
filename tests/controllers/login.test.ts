import { should, chai, app, expect } from '../helper.test';

import User from '../../src/models/user';

describe('Test Login', () => {
  // Create User in the database before test

  before((done) => {
    const newUser = new User({
      firstname: 'mocha',
      lastname: 'chai',
      email: 'mocha@gmail.com',
      password: 'MochaChai22',
      dateOfBirth: '1999-04-25',
      gender: 'female',
    });

    newUser.save((error) => {
      if (error) {
        done(error);
      }

      done();
    });
  });

  const path = '/login';

  describe('Test POST /login', () => {
    it('should return error on wrong email/password', (done) => {
      /**
       * - Response body sould exist
       * - Response status should be 401
       * - Response error property should be equal to true
       */

      const params = {
        email: 'mocha@gmail.com',
        password: 'Mochahahahaha',
      };

      chai
        .request(app)
        .post(path)
        .send(params)
        .end((error: any, response: any) => {
          if (error) {
            done(error);
          }

          should.exist(response.body);
          response.should.have.status(401);
          response.body.error.should.be.eql(true);
          done();
        });
    });

    it('should login successfully', (done) => {
      // Missing date_naissance, sexe

      /**
       * - Response body sould exist
       * - Response status should be 200
       * - Response error property should be equal to false
       * - Response body must contain tokens property
       */

      const params = {
        email: 'mocha@gmail.com',
        password: 'MochaChai22',
      };

      chai
        .request(app)
        .post(path)
        .send(params)
        .end((error: any, response: any) => {
          if (error) {
            done(error);
          }

          should.exist(response.body);
          response.should.have.status(200);
          response.body.error.should.be.eql(false);
          response.body.should.have.property('tokens');

          done();
        });
    });
  });
});
