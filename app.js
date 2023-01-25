const net = require('net');

const N = 20; // maximum number of clients
const clients = []; // list to hold connected clients
let rank = 0;

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const command = data.toString();
        console.log(`Received command: ${command}`);

        const client = clients.find((c) => c.socket === socket);
        if (!client) {
            console.log(`Invalid command for your rank.`);
            return;
        }

        // check if command is valid for client's rank
        const otherClients = clients.filter((c) => c.socket !== socket);
        if (otherClients.some((c) => c.rank < client.rank)) {
            console.log(`Invalid command for your rank.`);
            return;
        }

        // execute command
        console.log(`Executing command...`);
        socket.write(`Command executed`);
    });

    socket.on('close', () => {
        // remove client from list and then adjust ranks
        const clientPos = clients.findIndex((c) => c.socket === socket); //find client index position
        if (clientPos !== -1) {
            clients.splice(clientPos, 1);
            for (let i = clientPos; i < clients.length; i++) {
                clients[i].rank--;
            }
        }
    });

    if (clients.length < N) {
        clients.push({ socket, rank }); //asign clients with a rank
        console.log(`Got a connection from ${socket.remoteAddress} with rank ${rank}`);
        rank++;
    } else {
        socket.end('Server Has a maximum capacity of Clients.');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});