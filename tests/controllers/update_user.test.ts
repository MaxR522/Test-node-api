import { should, chai, app, expect } from '../helper.test';

import User from '../../src/models/user';

describe('Test Update User', () => {
  // Create User in the database before test

  before((done) => {
    const newUser = new User({
      firstname: 'mocha',
      lastname: 'chai',
      email: 'mocha2@gmail.com',
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

  const path = '/user/'; // "/user/:token"

  describe('Test PUT /user/:token', () => {
    it('should login then update successfully', (done) => {
      /**
       * Before test update, we need to login to generate tokens
       *
       * - Should have response.body
       * - Response status should be 200
       * - response body error property should be false
       */

      const loginParams = {
        email: 'mocha2@gmail.com',
        password: 'MochaChai22',
      };

      chai
        .request(app)
        .post('/login')
        .send(loginParams)
        .end((error: any, response: any) => {
          if (error) {
            throw new Error(error);
          }

          should.exist(response.body);
          const body = response.body;

          const updateParams = {
            firstname: 'updated',
          };

          chai
            .request(app)
            .put(path + body.tokens.token) // <-- get the token inside response.body
            .send(updateParams)
            .end((error: any, response: any) => {
              if (error) {
                done(error);
              }

              should.exist(response.body);
              response.should.have.status(200);
              response.body.error.should.be.eql(false);
              // Verify inside the DB if the user is really updated
              User.findOne(
                { email: 'mocha2@gmail.com' },
                (error: any, user: any) => {
                  if (error) {
                    done(error);
                  }

                  if (user) {
                    expect(user.firstname).equal('updated');
                  }
                  done();
                },
              );
            });
        });
    });

    it('Should return error on invalid token', (done) => {
      const updateParams = {
        firstname: 'updated',
      };

      chai
        .request(app)
        .put(path + 'invalid.token')
        .send(updateParams)
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
  });
});
