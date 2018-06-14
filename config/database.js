const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri: 'mongodb://localhost:27017/' + this.db,
  secert: crypto,
  db: 'mean-angular-2'
}