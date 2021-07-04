let crypto = require('crypto');
let util = require('util');

let pbkdf2Async = require('./pbkdf2Async');
let generateSalt = util.promisify(crypto.randomBytes);

/**
 * Function to hash the given password using PBKDF2 with SHA-512 and return the hash and salt
 * @param {String} password The password to be hashed
 */
async function hashPwd(password){
    let salt = await generateSalt(16);
    salt = salt.toString('hex');

    let hash = await pbkdf2Async(password,salt);

    return({user_pwdHash: hash, user_pwdSalt: salt});
}

module.exports = hashPwd;