const request = require('supertest');
const fs = require('fs');
const path = require('path'); 

const server = require('../server/server');

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/', () => {
    describe('Login', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and ejs', () => {
        request(server)
          .get('/')
          .expect('Content-type', /ejs/)
          .expect(200);
      });
      it('responds to register', () => {
          request(server)
            .get('/auth/register')
            .expect('Content-type', /ejs/)
            .expect(200);
      });
    });
  });
});
