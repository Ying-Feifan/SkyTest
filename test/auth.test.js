/* eslint-disable no-undef */
const auth = require('../Auth/auth');
const mockReq = require('sinon-express-mock').mockReq;
const mockRes = require('sinon-express-mock').mockRes;
const expect  = require('chai').expect;

describe('auth', function () {
    it('should auth work', function () {
        const request = {
            headers: {authorization:'aaaaaaaaaaa'}
        }
        const req = mockReq(request);
        const res = mockRes();
        auth(req, res);
        expect(res.status.calledOnceWith(401)).to.be.equal(true);
    });

});