const { promisify } = require('util')


class DatabaseHandler {

  constructor(db) {
    this.putPromise = promisify(db.put)
    this.getPromise = promisify(db.get)
  }

  put(key, data) {
    console.log('PUT REQ: \n  key: '+key+' \n  cipher: '+data)
    return this.putPromise(key, data)
      .catch(e => console.log('PUT ERROR', e))
  }

  get(key) {
    console.log('GET REQ: \n  key: '+key)
    return this.getPromise(key)
      .catch(e => console.log('GET ERROR', e))
  }

}

module.exports = DatabaseHandler
