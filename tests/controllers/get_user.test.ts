import { should, chai, app, expect } from '../helper.test';

import User from '../../src/models/user';

describe('Test GET User', () => {
  // Before test add one user inside DB then login to get the token

  before((done) => {
    const newUser = new User({
      firstname: 'mocha',
      lastname: 'chai',
      email: 'mocha3@gmail.com',
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

  // Before test update, we need to login to generate tokens
  it('Should login then get one user successfully', (done) => {
    const path = '/user/';

    const loginParams = {
      email: 'mocha3@gmail.com',
      password: 'MochaChai22',
    };

    chai
      .request(app)
      .post('/login')
      .send(loginParams)
      .end((error: any, response: any) => {
        if (error) {
          done(error);
        }

        should.exist(response.body);

        chai
          .request(app)
          .get(path + response.body.tokens.token) // <-- extract the token from response.body of login
          .end((error: any, response: any) => {
            if (error) {
              done(error);
            }

            should.exist(response.body);
            response.should.have.status(200);
            response.body.error.should.be.eql(false);
            response.body.should.have.property('user');
            done();
          });
      });
  });

  // Before test update, we need to login to generate tokens
  it('Should login then get all user successfully', (done) => {
    const path = '/users/';

    const loginParams = {
      email: 'mocha3@gmail.com',
      password: 'MochaChai22',
    };

    chai
      .request(app)
      .post('/login')
      .send(loginParams)
      .end((error: any, response: any) => {
        if (error) {
          done(error);
        }

        should.exist(response.body);

        chai
          .request(app)
          .get(path + response.body.tokens.token) // <-- extract the token from response.body of login
          .end((error: any, response: any) => {
            if (error) {
              done(error);
            }

            should.exist(response.body);
            response.should.have.status(200);
            response.body.error.should.be.eql(false);
            response.body.should.have.property('users');
            expect(response.body.users).to.be.an('array');
            done();
          });
      });
  });

  it('should return error on invalid token', (done) => {
    const path = '/user/';

    chai
      .request(app)
      .get(path + 'Invalid.token')
      .end((error: any, response: any) => {
        if (error) {
          done(error);
        }

        should.exist(response.body);
        response.should.have.status(401);
        response.body.error.should.be.eql(true);
        response.body.should.not.have.property('user');
        done();
      });
  });
});
