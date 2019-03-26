# tls-server-client
test  tls-server-client connection 

This package contains examples of secure servers and clients using TLS, HTTPS and websockets.

This is basically trying to get a tls connection between a server and 2 clients..

Install and Test
--------------------------------

Here are some instructions to run the TLS example clients and servers on your machine, should be straight forward.

1) Prerequisite:

	Nodejs, Node Package Manager, openssl (if you wanna create certificates), 


2) Move to the directory that created and install:

    $ cd tls-server-client/
    
    $ npm install
 

3) Because of the way my examples handle authentication it is required that the server find a host name via DNS that
matches the one in the client connection. So to keep the server happy edit your system host file  (in windows OS: c:/windows/system32/drivers/etc/hosts)  and add the
host name "testserver" to it like so:

    [ your-network-ip ]    server1.testserver


4) In a new shell window, run the server part:

    $ node server.js


5) Run the client part, from another terminal window:

    $ node client.js


6) Run the second client, from another terminal window :

    $ node client2.js

    see Server console for connection status


7) Let us make a API call (via postman) that connects to a http server, which then makes a connection to the tls server, server-server connecton

    $ node server.js

	in another terminal window run:

	$ node http-server.js
	
	make a GET request to `http://localhost:8000/api/ssl-connect` using POSTMAN

	see server console for connection info

8) Now lets make a connection and the spit out the full certificate info...

