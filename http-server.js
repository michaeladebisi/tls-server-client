const tls = require('tls');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const json = require('koa-json');
const path = require('path');;

const makeTlsConn = async (ctx) => {

  const options = {
      ca: fs.readFileSync('ssl/ca-crt.pem'),
      key: fs.readFileSync('ssl/client1-key.pem'),
      cert: fs.readFileSync('ssl/client1-crt.pem'),
      host: 'server1.testserver',
      port: 5000,
      rejectUnauthorized:true,
      requestCert:true
  };


  const socket = await tls.connect(options, () => {
      
      console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized');
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
ctx.body = "See server console for info";
return socket;
}




let app = new Koa();

// log all events to the terminal
app.use(logger());
app.use(json());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});
// setup routes

// instantiate our new Router

const sslRouter = new Router({
    prefix: '/api'
  });

// getting the home route
sslRouter.get('/ssl-connect', makeTlsConn);

// // getting the home route
// sslRouter.post('/ssl', makeTlsConn);

app.use(sslRouter.routes());
app.use(sslRouter.allowedMethods());


// tell the server to listen to events on a specific port
const port = process.env.PORT || 8000;

console.log("listening on port: ", port);

app.listen(port);



