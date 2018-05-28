import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
nacl.util = naclUtil


const SPLIT_HASH_CHAR = '-'


function get() {
  if (!window.location.href.includes('/#')) return
  const stringifiedCredentials = window.location.href.split('/#')[1]
  return parse(stringifiedCredentials)
}


function parse(hash) {
  if (!hash.includes(SPLIT_HASH_CHAR)) return
  return {
    id: hash.split(SPLIT_HASH_CHAR)[0],
    key: hash.split(SPLIT_HASH_CHAR)[1]
  }
}


function stringify(credentials) {
  return credentials.id + SPLIT_HASH_CHAR + credentials.key
}


function generate() {
  return {
    id: nacl.util.encodeBase64( nacl.randomBytes(16) ),
    key: nacl.util.encodeBase64( nacl.randomBytes(nacl.secretbox.keyLength) )
  }
}


export default {
  get,
  parse,
  stringify,
  generate
}
