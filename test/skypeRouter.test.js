/* eslint-disable no-undef */
const request = require('supertest');
const router = require('../Router/skyRouter');

describe('POST /sign-up', function () {
  it('sign-up success', function (done) {
    request(router)
      .post('/sign-in')
    done();
  });
});

describe('POST /sign-in', function () {
  it('sign-in success', function (done) {
    request(router)
      .post('/sign-in')
      .send({
        email: 'teste2@hotmail.com',
        senha: '123456'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    done();
  });
});


// describe('GET /find-user', function () {
//   it('find-user success', function (done) {
//     request(router)
//       .get('/find-user')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//     done();
//   });
// });