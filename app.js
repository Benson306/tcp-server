let net = require('net');

let n = 15; // max number of clients
let client_rank = 0;
let clients = [];


const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        let cmd = data.toString();
        console.log(`Command Received: ${cmd}`);

        let client = clients.find((client) => client.socket === socket); //get client issuing command

        let otherClients = clients.filter((client) => client.socket !== socket); //get other clients who re not issuing commands at the moment

        if (!client) {

            console.log(`No clients to serve`);

        }else if(!otherClients.some((clt) => clt.client_rank < client.client_rank)) {

            console.log(`Command Rejected. You are have no client below your rank to execute it. \n`);
            socket.write("Command Rejected. You are have no client below your rank to execute it.\n")

        }else{
            // Command is executed
            console.log(`Command is Executing...`);
            socket.write(`Command executed!.\n`);
        }    

    });

    socket.on('close', () => {
        
        // remove client from list and then adjust ranks
        const clientPos = clients.findIndex((c) => c.socket === socket); //find client index position
        if (clientPos !== -1) {
            clients.splice(clientPos, 1); //removes client
            //adjusts rank
            for (let i = clientPos; i < clients.length; i++) {
                clients[i].client_rank--; 
            }
            client_rank--;
            console.log(`Connection Closed for client with rank number ${clientPos} \n`)
            socket.write("Connection Closed.")
        }

        
    });

    if (clients.length < n) {
        clients.push({ socket, client_rank }); //asign clients with a rank
        console.log(`Connection received from ${socket.remoteAddress} and assigned rank no. ${client_rank}`);
        client_rank++;
        socket.write("Connection Succesful. Issue Command: \n")
        
    } else {
        socket.end('Server Has a maximum capacity of Clients.');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
