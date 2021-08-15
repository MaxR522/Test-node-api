import { should, chai, app, expect } from '../helper.test';

import User from '../../src/models/user';

describe('Test Register', () => {
  // Remove all user in the database before test

  before((done) => {
    User.deleteMany({}, (error) => {
      if (error) {
        done(error);
      }
      done();
    });
  });

  const path = '/register';

  describe('Test POST /register', () => {
    it('should return error on missing or wrong params', (done) => {
      // Missing date_naissance, sexe

      /**
       * - Response body sould exist
       * - Response status should be 401
       * - Response error property should be equal to true
       */

      const params = {
        firstname: 'mocha',
        lastname: 'chai',
        email: 'mochachai@',
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

    it('Should return success on Register', (done) => {
      // All params OK

      /**
       * - Response body sould exist
       * - Response status should be 201
       * - Response error property should be equal to false
       * - Response body should have tokens property
       */

      const params = {
        firstname: 'mocha',
        lastname: 'chai',
        email: 'mochachai@gmail.com',
        password: 'Mochahahaha2',
        date_naissance: '1997-05-30',
        sexe: 'female',
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
          response.should.have.status(201);
          response.body.error.should.be.eql(false);
          response.body.should.have.property('tokens');
          done();
        });
    });

    it('Should test the password hashing', (done) => {
      // Check if the password is really hashed before store in the DB

      // Find the registered user and
      // check if the password provided in the params
      // is not equal to the password store in the database

      try {
        const user = User.findOne(
          { email: 'mochachai@gmail.com' },
          (error: any, user: any) => {
            if (error) done(error);
            if (user) {
              expect(user.password).not.equal('Mochahahaha2'); // <-- password provided by the user not equal to the stored
              done();
            }
          },
        );
      } catch (error) {
        done(error);
      }
    });
  });
});
