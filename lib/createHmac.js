'use strict';
var crypto    = require('crypto');

/**
 * Create HMAC SHA1
 * ========================
 * text      {String} **required**
 * key       {String} **required**
 * algorithm {String} **optional**
 */

function createHmac(text,key,algorithm,encoding) {
    algorithm = algorithm || 'sha1';
    encoding  = encoding  || 'hex';
    var hmac = crypto.createHmac(algorithm, key);

    // change to 'binary' if you want a binary digest
    hmac.setEncoding(encoding);

    // write in the text that you want the hmac digest for
    hmac.write(text);

    // you can't read from the stream until you call end()
    hmac.end();

    // read out hmac digest
    return hmac.read();
}

module.exports = createHmac;