const request = require('supertest');
const server = require('../server/server');

/**
 * Authors: Taylor Davis
 * Testing Suite for Login and Registration Endpoints
 * 
 * 
 * 
 */

describe('Login Route', () => {
  describe('/', () => {
    describe('Login', () => {
      it('Initial load responds with 200 status and ejs', () => {
        request(server)
          .get('/')
          .expect('Content-type', /ejs/)
          .expect(200);
      });
      it('Registration call respons with 200 status and ejs', () => {
          request(server)
            .get('/auth/register')
            .expect('Content-type', /ejs/)
            .expect(200);
      });
    });
  });
});
