/**
 * Firebase admin
 *
 * @type {*}
 */
var admin = require("firebase-admin");

/**
 * Service account
 *
 * @type {*}
 */
var serviceAccount = require("Insert your credentials");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;