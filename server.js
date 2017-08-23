const express = require('express');
const easyrtc = require("easyrtc");
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
        this.createRTC();
    }

    createRoutes() {
        this.app.get('**', (req, res) => {
            res.sendFile(__dirname + '/client/build/index.html');
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
                if (!channel)
                    return socket.error(`Error on setChannel: ${channel}`);

                console.log('Change channel to', channel);

                /*const room = `${channel.mode}-${channel.frequency}`;
                socket.join(room);
                socket._rooms.push(room);
                this.io.to(room).emit('newMessage', {id: 123, msg: 'hello'})*/

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
                    if (!target)
                        return socket.error('Получателя с таким SSI в Вашем канале не существует');

                    console.log("sendMessage", target._id, data);
                    target.emit('newMessage', data)
            });
        });
    }

    createRTC() {
        easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
            console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
            easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
        });

        this.easyrtcServer = easyrtc.listen(this.app, this.io, null, (err, rtcRef) => {
            rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
                console.log("roomCreate fired! Trying to create: " + roomName);

                appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
            });
        });
    }
}

module.exports = new Server;

