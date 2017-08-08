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

        this.createRoutes();
        this.createServer();
        this.createSockets();
    }

    createRoutes() {
        this.app.get('**', (req, res) => {
            res.sendFile(__dirname + '/client/build/index1.html');
        });
    }

    createServer() {
        this.serverConfig = JSON.parse(fs.readFileSync('./server-config.json', 'utf8'));
        this.server = require('http').createServer(this.app);
        this.server.listen(this.serverConfig.port, this.serverConfig.host, () =>
            console.log(`Start listening on ${this.serverConfig.host}:${this.serverConfig.port}`)
        );
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
                    return console.log('Error on set socket id')
                }
                console.log('Change socket id to', id);

                socket._id = id;
            });

            socket.on('setChannel', (channel) => {
                console.log('Change channel to', channel);

                socket.channel = channel;
            });

            socket.on('sendMessage', (data) => {
                const target = utils.getSocketById(data.id, this.io.sockets.connected);
                if (!target)
                    return console.log('Error on sendMessage. Target not found');
                if (!target.channel)
                    return console.log('Error on sendMessage. Target channel not found');

                if (target.channel.mode !== socket.channel.mode || target.channel.frequency !== socket.channel.frequency)
                    return console.log('Error on sendMessage. Invalid channel settings');

                target.emit('newMessage', data)
            });
        });
    }

}

module.exports = new Server;

