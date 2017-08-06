const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const utils = require('./utils/index');

class Server {
    constructor() {
        this.app = express();
        this.setup();
    }

    setup() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.static(__dirname + '/client/build'));

        this.createServer();
        this.createSockets();
    }

    createServer() {
        const config = JSON.parse(fs.readFileSync('./server-config.json', 'utf8'));
        this.server = require('http').createServer(this.app);
        this.server.listen(config.port, config.host, () =>
            console.log(`Start listening on ${config.host}:${config.port}`)
        );

        this.app.get('/', (req, res) => res.end('ok'))
    }

    createSockets() {
        this.io = require('socket.io')(this.server);

        this.io.on('connection', (socket) => {
            console.log('user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('setId', (id) => {
                if (typeof id !== 'number') {
                    return new Error('Error on set socket id')
                }

                socket._id = id;
            });

            socket.on('sendMessage', (data) => {
                const target = utils.getSocketById(data.id, this.io.sockets.connected);
                console.log(target);
            });
        });
    }

}

module.exports = new Server;

