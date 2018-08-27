import chai from "chai";
import credentials from "./credentials";
const expect = chai.expect;

describe("credentials utility", function() {
  let _credentials;

  describe("generate hash", function() {
    it("should generate a credentials object", function() {
      _credentials = credentials.generate();
      expect(_credentials).to.be.an("object");
    });
  });

  describe("stringify and parse", function() {
    it("should return the same object", function() {
      const stringifiedCredentials = credentials.stringify(_credentials);
      expect(credentials.parse(stringifiedCredentials)).to.deep.equal(
        _credentials
      );
    });
  });
});
