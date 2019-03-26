const tls = require('tls');
const fs = require('fs');

const options = {
    ca: fs.readFileSync('ssl/ca-crt.pem'),  
    key: fs.readFileSync('ssl/server-key.pem'), 
    cert: fs.readFileSync('ssl/server-crt.pem'), 
    
    requestCert: true, 
    rejectUnauthorized: true
}; 
let clients = [];

const server = tls.createServer(options, (socket) => {

    console.log('server connected', 
        socket.authorized ? 'authorized' : 'unauthorized');
    
    // connection info
    //console.log("socket: ",  socket);
    console.log("Cipher: ",  socket.getCipher());
    console.log("Address: ", socket.address());
    console.log("Remote address: ", socket.remoteAddress);
    console.log("Remote port: ", socket.remotePort);

    socket.on('error', (error) => {
        console.log(error);
    });
    const datetime =  +(new Date);
    socket.write('welcome!.. you are now authorized to use this Server :' + datetime + '\n' );
    socket.setEncoding('utf8');
    socket.pipe(process.stdout);
    socket.pipe(socket);
});
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('server listen on port ', port);
});