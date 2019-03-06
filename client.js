const tls = require('tls');
const fs = require('fs');

const options = {
    ca: fs.readFileSync('ssl/ca-crt.pem'),
    key: fs.readFileSync('ssl/client1-key.pem'),
    cert: fs.readFileSync('ssl/client1-crt.pem'),
    host: 'server1.testserver',
    port: 5000,
    rejectUnauthorized:true,
    requestCert:true
};

const socket = tls.connect(options, () => {
    console.log('client connected', 
        socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
});

socket.setEncoding('utf8');

socket.on('data', (data) => {
    console.log(data);
});

socket.on('error', (error) => {
    console.log(error);
});

socket.on('end', (data) => {
    console.log('Socket end event');
});