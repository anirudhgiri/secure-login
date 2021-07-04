let util = require('util');
let crypto = require('crypto');

let pbkdf2Async = require('./pbkdf2Async');

async function authenticateUser(password, salt, dbHash){
    let hash = await pbkdf2Async(password,salt);
    return dbHash === hash.toString('hex');
}

module.exports = authenticateUser;