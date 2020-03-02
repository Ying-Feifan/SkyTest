/* eslint-disable no-undef */
const request = require('supertest');
const router = require('../Router/skyRouter');


describe('POST /sign-up', function () {
  it('sign-up success', function (done) {
    const mock = {
        nome: 'test2',
        email: 'teste2@hotmail.com',
        senha: '123456',
        telefones:[
          {
          numero:'999999999',
          ddd:'11'
          }
        ]
    };
    request(router)
      .post('/sign-up')
      .send(mock)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });
});

describe('POST /sign-in', function () {
  it('sign-in success', function (done) {
    const mock = {
      email: 'teste2@hotmail.com',
      senha: '123456'
    };
    request(router)
      .post('/sign-in')
      .send(mock)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });
});

describe('GET /find-user', function () {
  it('sign-in success', function (done) {
    request(router)
      .get('/find-user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });
});

