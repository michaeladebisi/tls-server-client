# tls-server-client
test  tls-server-client connection 

This package contains examples of secure servers and clients using TLS, HTTPS and websockets.

This is basically trying to get a tls connection between a server and 2 clients..

Install and Test
--------------------------------

Here are some instructions to run the TLS example clients and servers on your machine, should be straight forward.

1) Install nodejs 

A convenient way to do this is to use the node version manager, NVM, see instructions here:
https://github.com/creationix/nvm

2) Test it:

    $node.js -v
    v10.9.0
    

3) Move to the directory that created and install:

    $ cd tls-server-client/


4) Because of the way my examples handle authentication it is required that the server find a host name via DNS that
matches the one in the client connection. So to keep the server happy edit your system host file  (in windows OS: c:/windows/system32/drivers/etc/hosts)  and add the
host name "testserver" to it like so:

    <your-network-ip>    testserver


5) Run the server part:

    $ node server.js


6) Run the client part, from another terminal window or ssh session:

    $ node client.js


7) Run the second client, from another terminal window or ssh session:

    $ node client2.js

	see Server console for connection status


8) Lets make a  api call (via postman) that connects to tls server, server-server connecton

    $ node server.js

	in another shell window run:

	$ node http-server.js
	
	make a GET request to `http://localhost:8000/api/ssl-connect` 

	see server console for connection info

    