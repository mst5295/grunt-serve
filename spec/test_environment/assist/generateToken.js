var jwt = require ('jsonwebtoken');
var fs = require('fs');
var cert = fs.readFileSync('private.key');
var token = jwt.sign({foo:'bar'}, cert,{algorithm: 'RS256', expiresIn: '10y'});
console.log(token);