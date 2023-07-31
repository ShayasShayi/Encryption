var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

var entropy = 'Random string, integer or float';
var rsa = new RSA({ entropy: entropy });


// Alternate AES keysize (some AES algorithms requires specific key size)
var crypt = new Crypt({
    // Increase amount of entropy
    entropy: entropy,
    // Default AES standard is AES-CBC. Options are:
    // AES-ECB, AES-CBC, AES-CFB, AES-OFB, AES-CTR, AES-GCM, 3DES-ECB, 3DES-CBC, DES-ECB, DES-CBC
    aesStandard: 'AES-CBC',
    // Default RSA standard is RSA-OAEP. Options are:
    // RSA-OAEP, RSAES-PKCS1-V1_5
    rsaStandard: 'RSA-OAEP',
    // Select default message digest
    md: 'sha512',
    aesKeySize: 192, // Defaults to 256,
});

rsa.generateKeyPair(function(keyPair) {
    // Callback function receives new key pair as a first argument
    var publicKey = keyPair.publicKey;
    var privateKey = keyPair.privateKey;

    var message = 'send a message to (someone), especially by email, text, app, or other electronic means.I was messaged by a Californian contact for some information';
    // Encryption with one public RSA key
    var encrypted = crypt.encrypt(publicKey, message);
    var result = JSON.parse(encrypted);

    console.log("encrypted message cipher : ",result.cipher);
    console.log("encrypted message key : ",result.keys);

    var decrypted = crypt.decrypt(privateKey, encrypted);

    // Get decrypted message
    var result = decrypted.message;
    console.log("decrpyed message",result)
});


