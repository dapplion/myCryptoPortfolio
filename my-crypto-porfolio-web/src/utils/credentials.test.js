import chai from 'chai'
const expect = chai.expect;
import credentials from './credentials'

describe('credentials utility', function() {

  let _credentials

  describe('generate hash', function() {

    it('should generate a credentials object', function() {

      _credentials = credentials.generate()
      expect(_credentials).to.be.an('object')
    });
  });

  describe('stringify and parse', function() {

    it('should return the same object', function() {

      const stringifiedCredentials = credentials.stringify(_credentials)
      expect(credentials.parse(stringifiedCredentials)).to.deep.equal(_credentials)
    });

  });
});
