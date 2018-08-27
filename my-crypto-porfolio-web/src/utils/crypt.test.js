import chai from "chai";
import crypt from "./crypt";
import credentials from "./credentials";
const expect = chai.expect;

describe("crypt utility", function() {
  describe("encryption + decryption", function() {
    it("should return the original message", function() {
      // Create random data
      const data = "sample data";
      // Generate a valid key
      const key = credentials.generate().key;
      // encrypt data
      const val = crypt.encrypt(data, key);
      // decrypt data
      const returnedData = crypt.decrypt(val, key);
      expect(data).to.equal(returnedData);
    });
  });
});
