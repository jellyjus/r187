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
                    const msg = 'Неправильный SSI';
                    return socket.error(msg)
                }
                console.log('Change socket id to', id);

                socket._id = id;
            });

            socket.on('setChannel', (channel) => {
                console.log('Change channel to', channel);

                socket.channel = channel;
            });

            socket.on('sendMessage', (data) => {
                    let target = null;
                    const sockets = this.io.sockets.connected;
                    for (let key in sockets) {
                        if (
                            sockets[key]._id === data.id &&
                            sockets[key].channel &&
                            sockets[key].channel.mode === socket.channel.mode &&
                            sockets[key].channel.frequency === socket.channel.frequency
                        )
                            target = sockets[key];
                    }
                    if (!target) {
                        const msg = 'Получателя с таким SSI в Вашем канале не существует';
                        return socket.error(msg)
                    }

                    target.emit('newMessage', data)
            });
        });
    }

}

module.exports = new Server;

