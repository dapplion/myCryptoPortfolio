import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";
nacl.util = naclUtil;

const SPLIT_CYPHER_CHAR = ".";

function encrypt(messageString, keyEncoded) {
  // Compute vars
  let nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  let key = nacl.util.decodeBase64(keyEncoded);
  let messageBytes = nacl.util.decodeUTF8(messageString);

  // encrypt
  let box = nacl.secretbox(messageBytes, nonce, key);

  // Concat
  let nonceEncoded = nacl.util.encodeBase64(nonce);
  let cypherText = nacl.util.encodeBase64(box);
  return nonceEncoded + SPLIT_CYPHER_CHAR + cypherText;
}

function decrypt(input, keyEncoded) {
  // compute vars
  let nonceEncoded = input.split(SPLIT_CYPHER_CHAR)[0];
  let cypherText = input.split(SPLIT_CYPHER_CHAR)[1];
  let key = nacl.util.decodeBase64(keyEncoded);
  let nonce = nacl.util.decodeBase64(nonceEncoded);
  let box = nacl.util.decodeBase64(cypherText);

  // decrypt
  let messageBytes = nacl.secretbox.open(box, nonce, key);
  return nacl.util.encodeUTF8(messageBytes);
}

export default {
  encrypt,
  decrypt
};
