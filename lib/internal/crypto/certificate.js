var crypto = require('@org.apache.commons.crypto');
var digest = require('@org.apache.commons.codec.digest');

function exportChallenge(spkac) {
    
}

function exportPublicKey(spkac, encoding) {

}

function verifySpkac(spkac) {
    
}

function genCertFromStr(data) {
    var cert = digest.DigestUtils.sha1Hex(data);
}