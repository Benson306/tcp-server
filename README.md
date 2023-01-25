# TCP Server

TCP server is a node.js server that allows a maximum of 15 clients to connect to it. It assigns ranks to clients based on first-come-first-serve.

Clients can send to the server commands that the server distributes among the clients. Only a client with a lower rank can execute a command of a higher rank client. Higher rank clients cannot execute commands by lower rank clients, so these commands are rejected. 

## Installation

The package manager [npm](https://www.npmjs.com) will be used install to tcp-server

## Prerequisites
Ensure you have [node.js](https://nodejs.org/en/download) installed on your PC.

Ensure [npm](https://www.npmjs.com/package/npm) is installed. If not installed, run:
```python
npm i npm
```

Ensure you have [Netcat](https://www.cyberithub.com/install-netcat-command-on-linux/) installed

## How to install
```bash
#clone the project
git clone https://github.com/Benson306/tcp-server

#Get into project directory
cd tcp-server

#install the requirements
npm install
npm install -g nodemon
```

## Usage

```python
#run the program
nodemon app.js

# TCP server has been started. Send request to server via Netcat listener
# Open a new shell and execute
nc localhost 3000

#server responds with a client rank

#Send command to server
pwd
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)