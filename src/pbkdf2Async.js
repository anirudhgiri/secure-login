let util = require('util');
let crypto = require('crypto');

/**
 * PBKDF2 algorithm with fixed iterations (250,000) and keylen (64 bytes)
 * @param {String} password The password to be hashed 
 * @param {String} salt The salt of the password
 * @returns {String} The SHA512 hash of the password run through PBKDF2
 */
async function pbkdf2Async(password, salt){ 
    let hash = await util.promisify(crypto.pbkdf2)(password,salt,250000,64,'sha512');
    return hash.toString('hex');
}

module.exports = pbkdf2Async;