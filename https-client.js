var https = require('https');
const fs = require('fs');
var options = {
    ca: fs.readFileSync('ssl/ca-crt.pem'),
    key: fs.readFileSync('ssl/client1-key.pem'),
    cert: fs.readFileSync('ssl/client1-crt.pem'),
    host: 'server1.testserver',
    port: 8443,
    method: 'GET'
};

var req = https.request(options, function(res) {
    console.log(res.connection.getPeerCertificate());
});

req.end();